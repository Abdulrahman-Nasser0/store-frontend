"use server";
import { LaptopById, PaginatedLaptopsResponse, ApiResponse, LoginRequest, RegisterRequest , LoginResponse, AuthStatusResponse  } from './types'


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
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    
    const responseText = await response.text();

    // Check if response is empty
    if (!responseText || responseText.trim() === '') {
      return {
        isSuccess: false,
        message: `Our servers are temporarily unavailable. Please try again in a few moments.`,
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
      console.error('JSON Parse Error:', parseError);
      console.error('Invalid JSON:', responseText);
      return {
        isSuccess: false,
        message: "We're experiencing technical difficulties. Please try again later.",
        messageAr: "استجابة JSON غير صالحة من الخادم",
        data: null as T,
        errors: [`Invalid JSON: ${responseText.substring(0, 100)}...`],
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    }
    

    return data;
    
  } catch (error) {
    console.error("❌ API call failed:", error);
    console.error('🔗 Failed URL:', url);

    // Refresh token 
    if (error instanceof Response && error.status === 401 && options.headers) {
      const headers = { ...options.headers } as Record<string, string>;
      const session = await getSession();
      if (session?.refreshTokenExpiration) {
        const refreshResponse = await refreshTokenApi(session.refreshTokenExpiration);
        if (refreshResponse.isSuccess && refreshResponse.data?.token) {
          await createSession(
            session.userId,
            session.email,
            session.name,
            refreshResponse.data.token,
            session.roles,
            session.emailConfirmed,
            refreshResponse.data.refreshTokenExpiration
          );
          // Retry the original request with the new token
          headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return apiCall<T>(endpoint, { ...options, headers });
        } else {
          console.error("❌ Token refresh failed");
        }
      }
    }

    // Return error in backend format
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Unable to connect to our servers. Please check your internet connection and try again.",
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
  return apiCall<null>("/api/Auth/confirm-email", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

// Resend Verification Code
export async function resendVerificationApi(email: string, verificationType: number) {
  return apiCall<null>("/api/Auth/resend-verification-code", {
    method: "POST",
    body: JSON.stringify({ email, verificationType }),
  });
}

// Forgot Password
export async function forgotPasswordApi(email: string) {
  return apiCall<null>("/api/Auth/forgot-password", {
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
  return apiCall<null>("/api/Auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, code, newPassword, confirmPassword }),
  });
}

// Refresh Token
export async function refreshTokenApi(refreshToken: string) {
  return apiCall<LoginResponse>("/api/Auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  return apiCall<null>("/api/Auth/change-password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });
}

// ==========================================
// LAPTOP API CALLS
// ==========================================

export async function getLaptops({
  page = 1,
  pageSize = 10,
  search,
  category,
  sortBy,
  sortDirection,
  token
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sortBy?: 0 | 1 | 2; // 0 = Id, 1 = ModelName, 2 = Price
  sortDirection?: 0 | 1; // 0 = Asc, 1 = Desc
  token?: string;
} = {}) {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('Page', page.toString());
  if (pageSize !== undefined) params.append('PageSize', pageSize.toString());
  if (search) params.append('Search', search);
  if (category) params.append('Category', category);
  if (sortBy !== undefined) params.append('SortBy', sortBy.toString());
  if (sortDirection !== undefined) params.append('SortDirection', sortDirection.toString());

  const queryString = params.toString();
  const endpoint = `/api/Laptop${queryString ? `?${queryString}` : ''}`;

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<PaginatedLaptopsResponse>(endpoint, {
    method: "GET",
    headers,
  });
}

export async function getLaptopById(id: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return apiCall<LaptopById>(`/api/Laptop/${id}`, {
    method: "GET",
    headers,
  });
}

import { getSession, createSession } from "./session";