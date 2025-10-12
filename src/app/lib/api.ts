// lib/api.ts
"use server";

// Import types from your types file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  isSuccess: boolean;
  message: string;
  messageAr?: string;
  data: T;
  errors?: string[];
  statusCode: number;
  timestamp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  message: string | null;
  isAuthenticated: boolean;
  username: string;
  email: string;
  roles: string[];
  token: string;
  emailConfirmed: boolean;
  refreshTokenExpiration: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is required");
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    console.log(`🔵 API Request: ${options.method || "GET"} ${url}`);
    console.log('📤 Request Body:', options.body);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    
    // Get response text first
    const responseText = await response.text();
    console.log('📥 Response Text:', responseText);

    // Check if response is empty
    if (!responseText || responseText.trim() === '') {
      console.error('❌ Empty response from server');
      return {
        isSuccess: false,
        message: `Server returned empty response (Status: ${response.status})`,
        messageAr: "الخادم أرجع استجابة فارغة",
        data: null as T,
        errors: [`HTTP ${response.status}: Empty response body`],
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    }

    // Try to parse JSON
    let data: ApiResponse<T>;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      // refresh token 
      console.error('❌ JSON Parse Error:', parseError);
      console.error('📄 Invalid JSON:', responseText);
      return {
        isSuccess: false,
        message: "Invalid JSON response from server",
        messageAr: "استجابة JSON غير صالحة من الخادم",
        data: null as T,
        errors: [`Invalid JSON: ${responseText.substring(0, 100)}...`],
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    }
    
    // Log success in development
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ API ${options.method || "GET"} ${endpoint}:`, {
        status: response.status,
        isSuccess: data.isSuccess,
        message: data.message,
      });
    }

    return data;
    
  } catch (error) {
    console.error("❌ API call failed:", error);
    console.error('🔗 Failed URL:', url);
    
    // Return error in backend format
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Network error occurred",
      messageAr: "حدث خطأ في الشبكة",
      data: null as T,
      errors: [error instanceof Error ? error.message : "Unknown error"],
      statusCode: 500,
      timestamp: new Date().toISOString(),
    };
  }
}

// ==========================================
// AUTH API CALLS
// ==========================================

// Login API call
export async function loginApi(credentials: LoginRequest) {
  return apiCall<LoginResponse>("/api/Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/plain",
    },
    body: JSON.stringify(credentials),
  });
}

// Register API call
export async function registerApi(userData: RegisterRequest) {
  return apiCall<LoginResponse>("/api/Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/plain",
    },
    body: JSON.stringify(userData),
  });
}

// Logout API call
export async function logoutApi(token: string) {
  return apiCall<boolean>("/api/Auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export interface AuthStatusResponse {
  isAuthenticated: boolean;
  username: string | null;
  userId: string;
  email: string;
  roles: string[];
  tokenExpiry: string | null;
}

// Auth Status
export async function authStatusApi(token: string) {
  return apiCall<AuthStatusResponse | null>("/api/Auth/status", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Confirm Email
export async function confirmEmailApi(email: string, code: string) {
  return apiCall<null>("/api/Auth/ConfirmEmail", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

// Resend Verification Code
export async function resendVerificationApi(email: string, verificationType: number) {
  return apiCall<null>("/api/Auth/ResendVerificationCode", {
    method: "POST",
    body: JSON.stringify({ email, verificationType }),
  });
}

// Forgot Password
export async function forgotPasswordApi(email: string) {
  return apiCall<null>("/api/Auth/ForgotPassword", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Reset Password
export async function resetPasswordApi(
  email: string,
  code: string,
  newPassword: string,
  confirmPassword: string
) {
  return apiCall<null>("/api/Auth/ResetPassword", {
    method: "POST",
    body: JSON.stringify({ email, code, newPassword, confirmPassword }),
  });
}

// Refresh Token
export async function refreshTokenApi(refreshToken: string) {
  return apiCall<LoginResponse>("/api/Auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

// Change Password
export async function changePasswordApi(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  token: string
) {
  return apiCall<null>("/api/Auth/ChangePassword", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });
}

// ==========================================
// PRODUCTS API CALLS (for later)
// ==========================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export async function getProducts(token?: string) {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return apiCall<Product[]>("/api/products", {
    method: "GET",
    headers,
  });
}

export async function getProductById(id: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return apiCall<Product>(`/api/products/${id}`, {
    method: "GET",
    headers,
  });
}