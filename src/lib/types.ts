export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;

export type SignUpState = {
  errors?: {
    userName?: string[];
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
} | undefined;

export interface Laptop {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  rate: number;
  reviewsCount: number;
  isDiscounted: boolean;
  discountedPrice: number | null;
  shortDescription: string;
}

export interface LaptopById {
  id: number;
  modelName: string;
  processor: string;
  gpu: string;
  screenSize: string;
  hasCamera: boolean;
  hasKeyboard: boolean;
  hasTouchScreen: boolean;
  ports: string;
  description: string;
  notes: string;
  warranty: string;
  brandId: number;
  categoryId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  brand: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
  images: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ratings: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repairRequests: any[];
}

export interface PaginatedLaptopsResponse {
  items: Laptop[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  startIndex: number;
  endIndex: number;
}

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

export interface AuthStatusResponse {
  isAuthenticated: boolean;
  username: string | null;
  userId: string;
  email: string;
  roles: string[];
  tokenExpiry: string | null;
}

export interface LaptopCardProps {
  laptop: Laptop;
}

export interface LaptopsGridProps {
  laptops: Laptop[];
  loading: boolean;
  error: string | null;
}