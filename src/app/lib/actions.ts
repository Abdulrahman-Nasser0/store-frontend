"use server";
import { z } from "zod";
import { createSession, deleteSession, getSession } from "./session";
import { redirect } from "next/navigation";
import { loginApi, registerApi, authStatusApi } from "./api";

// ==========================================
// VALIDATION SCHEMAS
// ==========================================

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

const signUpSchema = z.object({
  userName: z.string().min(3, { message: "Username must be at least 3 characters" }).trim(),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ==========================================
// TYPES
// ==========================================

type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;

type SignUpState = {
  errors?: {
    userName?: string[];
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
} | undefined;

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
    return {
      errors: {
        email: response.errors || [response.message],
      },
      message: response.message,
    };
  }

  // 4. Check if we have the required data
  if (!response.data || !response.data.token) {
    return {
      errors: {
        email: ["Invalid response from server"],
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

    // If no field-specific errors, show general error on email field
    if (Object.keys(fieldErrors).length === 0) {
      fieldErrors.email = [response.message];
    }

    return {
      errors: fieldErrors,
      message: response.message,
    };
  }

  // 4. Registration successful - redirect to email verification page
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
    // console.log("Server session:", session); // Debug log

    if (!session?.token) {
      // console.log("No token found in session"); // Debug log
      return {
        isSuccess: false,
        message: "No authentication token found",
        data: null,
      };
    }

    const response = await authStatusApi(session.token);
    // console.log("Auth status API response:", response); // Debug log
    return response;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return {
      isSuccess: false,
      message: "Failed to fetch user profile",
      data: null,
    };
  }
}