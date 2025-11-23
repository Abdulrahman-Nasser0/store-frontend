"use server";
import { LaptopById, PaginatedLaptopsResponse, ApiResponse, LoginRequest, RegisterRequest , LoginResponse, AuthStatusResponse, LaptopVariantsResponse, CartData, AddToCartRequest, AddToCartResponse, UpdateCartItemRequest, RemoveCartItemResponse, ClearCartResponse  } from './types'
import { USE_MOCK_DATA, getMockLaptops, getMockLaptopById, getMockLaptopVariants, getMockCart, addMockCartItem, updateMockCartItem, removeMockCartItem, clearMockCart } from './mock-data/config'

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
  pageSize = 20,
  search,
  brandId,
  categoryId,
  isActive,
  releaseYear,
  hasCamera,
  hasTouchScreen,
  token
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  brandId?: number;
  categoryId?: number;
  isActive?: boolean;
  releaseYear?: number;
  hasCamera?: boolean;
  hasTouchScreen?: boolean;
  token?: string;
} = {}) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    const mockData = getMockLaptops({ page, pageSize, search, categoryId, isActive });
    return Promise.resolve({
      isSuccess: true,
      message: "Laptops retrieved successfully (mock data)",
      messageAr: "تم استرجاع البيانات بنجاح",
      data: mockData,
      errors: [],
      statusCode: 200,
      timestamp: new Date().toISOString(),
    } as ApiResponse<PaginatedLaptopsResponse>);
  }

  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', page.toString());
  if (pageSize !== undefined) params.append('pageSize', pageSize.toString());
  if (search) params.append('search', search);
  if (brandId !== undefined) params.append('brandId', brandId.toString());
  if (categoryId !== undefined) params.append('categoryId', categoryId.toString());
  if (isActive !== undefined) params.append('isActive', isActive.toString());
  if (releaseYear !== undefined) params.append('releaseYear', releaseYear.toString());
  if (hasCamera !== undefined) params.append('hasCamera', hasCamera.toString());
  if (hasTouchScreen !== undefined) params.append('hasTouchScreen', hasTouchScreen.toString());

  const queryString = params.toString();
  const endpoint = `/api/laptops${queryString ? `?${queryString}` : ''}`;

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
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    const mockLaptop = getMockLaptopById(id);
    if (mockLaptop) {
      return Promise.resolve({
        isSuccess: true,
        message: "Laptop retrieved successfully (mock data)",
        messageAr: "تم استرجاع البيانات بنجاح",
        data: mockLaptop,
        errors: [],
        statusCode: 200,
        timestamp: new Date().toISOString(),
      } as ApiResponse<LaptopById>);
    } else {
      return Promise.resolve({
        isSuccess: false,
        message: "Laptop not found",
        messageAr: "لم يتم العثور على اللابتوب",
        data: null as unknown as LaptopById,
        errors: ["Laptop not found"],
        statusCode: 404,
        timestamp: new Date().toISOString(),
      } as ApiResponse<LaptopById>);
    }
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return apiCall<LaptopById>(`/api/laptops/${id}`, {
    method: "GET",
    headers,
  });
}

export async function getLaptopVariants({
  laptopId,
  page = 1,
  pageSize = 10,
  inStockOnly = false,
  token
}: {
  laptopId: number;
  page?: number;
  pageSize?: number;
  inStockOnly?: boolean;
  token?: string;
}) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    try {
      const mockData = getMockLaptopVariants(laptopId, page, pageSize, inStockOnly);
      return Promise.resolve({
        isSuccess: true,
        message: "Laptop variants fetched successfully (mock data)",
        messageAr: "تم جلب أنواع اللابتوب بنجاح",
        data: mockData,
        errors: [],
        statusCode: 200,
        timestamp: new Date().toISOString(),
      } as ApiResponse<LaptopVariantsResponse>);
    } catch (error) {
      return Promise.resolve({
        isSuccess: false,
        message: error instanceof Error ? error.message : "Laptop not found",
        messageAr: "لم يتم العثور على اللابتوب",
        data: null as unknown as LaptopVariantsResponse,
        errors: [error instanceof Error ? error.message : "Laptop not found"],
        statusCode: 404,
        timestamp: new Date().toISOString(),
      } as ApiResponse<LaptopVariantsResponse>);
    }
  }

  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', page.toString());
  if (pageSize !== undefined) params.append('pageSize', pageSize.toString());
  if (inStockOnly !== undefined) params.append('inStockOnly', inStockOnly.toString());

  const queryString = params.toString();
  const endpoint = `/api/laptops/${laptopId}/variants${queryString ? `?${queryString}` : ''}`;

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<LaptopVariantsResponse>(endpoint, {
    method: "GET",
    headers,
  });
}

// ==========================================
// CART API CALLS
// ==========================================

export async function getCart(token?: string) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    const mockData = getMockCart();
    return Promise.resolve({
      isSuccess: true,
      message: "Cart fetched successfully (mock data)",
      messageAr: "تم جلب عربة التسوق بنجاح",
      data: mockData,
      errors: [],
      statusCode: 200,
      timestamp: new Date().toISOString(),
    } as ApiResponse<CartData>);
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<CartData>("/api/cart", {
    method: "GET",
    headers,
  });
}

export async function addToCart(request: AddToCartRequest, token?: string) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    try {
      const mockData = addMockCartItem(request.productType, request.productId, request.quantity);
      return Promise.resolve({
        isSuccess: true,
        message: "Item added to cart successfully (mock data)",
        messageAr: "تمت إضافة العنصر إلى عربة التسوق بنجاح",
        data: mockData,
        errors: [],
        statusCode: 201,
        timestamp: new Date().toISOString(),
      } as ApiResponse<AddToCartResponse>);
    } catch (error) {
      return Promise.resolve({
        isSuccess: false,
        message: error instanceof Error ? error.message : "Failed to add item to cart",
        messageAr: "فشل في إضافة العنصر إلى عربة التسوق",
        data: null as unknown as AddToCartResponse,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        statusCode: 400,
        timestamp: new Date().toISOString(),
      } as ApiResponse<AddToCartResponse>);
    }
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<AddToCartResponse>("/api/cart/items", {
    method: "POST",
    headers,
    body: JSON.stringify(request),
  });
}

export async function updateCartItem(itemId: number, request: UpdateCartItemRequest, token?: string) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    try {
      updateMockCartItem(itemId, request.quantity);
      const mockData = getMockCart();
      return Promise.resolve({
        isSuccess: true,
        message: "Cart item updated successfully (mock data)",
        messageAr: "تم تحديث عنصر عربة التسوق بنجاح",
        data: mockData,
        errors: [],
        statusCode: 200,
        timestamp: new Date().toISOString(),
      } as ApiResponse<CartData>);
    } catch (error) {
      return Promise.resolve({
        isSuccess: false,
        message: error instanceof Error ? error.message : "Failed to update cart item",
        messageAr: "فشل في تحديث عنصر عربة التسوق",
        data: null as unknown as CartData,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        statusCode: 400,
        timestamp: new Date().toISOString(),
      } as ApiResponse<CartData>);
    }
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<CartData>(`/api/cart/items/${itemId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(request),
  });
}

export async function removeCartItem(itemId: number, token?: string) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    try {
      const mockData = removeMockCartItem(itemId);
      return Promise.resolve({
        isSuccess: true,
        message: "Item removed from cart successfully (mock data)",
        messageAr: "تمت إزالة العنصر من عربة التسوق بنجاح",
        data: mockData,
        errors: [],
        statusCode: 200,
        timestamp: new Date().toISOString(),
      } as ApiResponse<RemoveCartItemResponse>);
    } catch (error) {
      return Promise.resolve({
        isSuccess: false,
        message: error instanceof Error ? error.message : "Failed to remove cart item",
        messageAr: "فشل في إزالة العنصر من عربة التسوق",
        data: null as unknown as RemoveCartItemResponse,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        statusCode: 400,
        timestamp: new Date().toISOString(),
      } as ApiResponse<RemoveCartItemResponse>);
    }
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<RemoveCartItemResponse>(`/api/cart/items/${itemId}`, {
    method: "DELETE",
    headers,
  });
}

export async function clearCart(token?: string) {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    const mockData = clearMockCart();
    return Promise.resolve({
      isSuccess: true,
      message: "Cart cleared successfully (mock data)",
      messageAr: "تم مسح عربة التسوق بنجاح",
      data: mockData,
      errors: [],
      statusCode: 200,
      timestamp: new Date().toISOString(),
    } as ApiResponse<ClearCartResponse>);
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiCall<ClearCartResponse>("/api/cart", {
    method: "DELETE",
    headers,
  });
}

import { getSession, createSession } from "./session";