"use server";
import { createSession, deleteSession, getSession } from "./session";
import { redirect } from "next/navigation";
import { loginApi, registerApi, authStatusApi } from "./api";
import {LoginState, SignUpState} from "./types";
import {loginSchema, signUpSchema} from "./validation";


// ==========================================
// LOGIN ACTION
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(_prevState: any, formData: FormData): Promise<LoginState> {
  // 1. Validate form data
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  // 2. Call backend API
  const response = await loginApi({ email, password });

  // 3. Handle API response
  if (!response.isSuccess) {
    // Map backend errors to user-friendly messages
    let userFriendlyMessage = response.message;
    
    // Handle specific backend error messages
    if (response.message.toLowerCase().includes("application not found")) {
      userFriendlyMessage = "Unable to connect to the authentication service. Our team is working on this. Please try again in a few moments.";
    } else if (response.message.toLowerCase().includes("invalid") || 
               response.message.toLowerCase().includes("incorrect")) {
      userFriendlyMessage = "Invalid email or password. Please check your credentials and try again.";
    } else if (response.message.toLowerCase().includes("network")) {
      userFriendlyMessage = "Network connection issue. Please check your internet connection and try again.";
    } else if (response.message.toLowerCase().includes("server") || 
               response.message.toLowerCase().includes("empty response")) {
      userFriendlyMessage = "Our servers are temporarily unavailable. Please try again in a few moments.";
    }
    
    return {
      errors: {
        email: [userFriendlyMessage],
      },
      message: userFriendlyMessage,
    };
  }

  // 4. Check if we have the required data
  if (!response.data || !response.data.token) {
    return {
      errors: {
        email: ["We encountered an issue while logging you in. Please try again."],
      },
      message: "Login failed",
    };
  }

  

  // 5. Create session with user data
  await createSession(
    response.data.username,
    response.data.email,
    response.data.username, // or response.data.fullName if you add it to API
    response.data.token,
    response.data.roles,
    response.data.emailConfirmed,
    response.data.refreshTokenExpiration
  );
  console.log(response.data)

  // 6. Redirect to dashboard
  redirect("/dashboard");
}

// ==========================================
// SIGNUP ACTION
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signUp(_prevState: any, formData: FormData): Promise<SignUpState> {
  // 1. Validate form data
  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userName, fullName, email, password, confirmPassword } = result.data;

  // 2. Call backend API
  const response = await registerApi({
    userName,
    fullName,
    email,
    password,
    confirmPassword,
  });

  // 3. Handle API response
  if (!response.isSuccess) {
    // Map backend errors to form fields
    const fieldErrors: {
      userName?: string[];
      fullName?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
    } = {};
    
    if (response.errors) {
      response.errors.forEach(error => {
        const lowerError = error.toLowerCase();
        if (lowerError.includes("email")) {
          fieldErrors.email = fieldErrors.email || [];
          fieldErrors.email.push(error);
        } else if (lowerError.includes("password")) {
          fieldErrors.password = fieldErrors.password || [];
          fieldErrors.password.push(error);
        } else if (lowerError.includes("username")) {
          fieldErrors.userName = fieldErrors.userName || [];
          fieldErrors.userName.push(error);
        } else if (lowerError.includes("name")) {
          fieldErrors.fullName = fieldErrors.fullName || [];
          fieldErrors.fullName.push(error);
        }
      });
    }

    // Handle "Application not found" and other server errors
    let userFriendlyMessage = response.message;
    if (response.message.toLowerCase().includes("application not found")) {
      userFriendlyMessage = "Unable to connect to the registration service. Our team is working on this. Please try again in a few moments.";
    } else if (response.message.toLowerCase().includes("server") || 
               response.message.toLowerCase().includes("empty response")) {
      userFriendlyMessage = "Our servers are temporarily unavailable. Please try again in a few moments.";
    } else if (response.message.toLowerCase().includes("network")) {
      userFriendlyMessage = "Network connection issue. Please check your internet connection and try again.";
    }

    // General error on email field if no specific field errors
    if (Object.keys(fieldErrors).length === 0) {
      fieldErrors.email = [userFriendlyMessage];
    }

    return {
      errors: fieldErrors,
      message: response.message,
    };
  }

  // 4. To email verification page
  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}


// ==========================================
// LOGOUT ACTION
// ==========================================
export async function logout() {
  // Get session to retrieve token
  const session = await getSession();
  
  if (session?.token) {
    // Call backend logout endpoint
    try {
      const { logoutApi } = await import("./api");
      await logoutApi(session.token);
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with local logout even if API fails
    }
  }
  
  // Delete local session
  await deleteSession();
  redirect("/login");
}

// ==========================================
// PROFILE ACTIONS
// ==========================================

export async function getUserProfile() {

  try {
    const session = await getSession();

    
    if (!session?.token) {

      return {
        isSuccess: false,
        message: "Your session has expired. Please log in again.",
        data: null,
      };
    }

    const response = await authStatusApi(session.token);

    return response;
  } catch {

    return {
      isSuccess: false,
      message: "We couldn't load your profile. Please try again.",
      data: null,
    };
  }
}