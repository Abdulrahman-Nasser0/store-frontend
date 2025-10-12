"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is required");
}

// Backend response type 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any> = {
  isSuccess: boolean;
  message: string;
  messageAr: string;
  data: T | null;
  errors: string[] | null;
  statusCode: number;
  timestamp: string;
};


// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();
    
    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`API ${options.method || "GET"} ${endpoint}:`, {
        status: response.status,
        isSuccess: data.isSuccess,
        message: data.message,
      });
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    
    // Return error in backend format
    return {
      isSuccess: false,
      message: "Network error occurred",
      messageAr: "حدث خطأ في الشبكة",
      data: null,
      errors: [error instanceof Error ? error.message : "Unknown error"],
      statusCode: 500,
      timestamp: new Date().toISOString(),
    };
  }
}
