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

// Brand interface
export interface Brand {
  id: number;
  name: string;
  country?: string;
  logoUrl: string;
}

// Category interface
export interface Category {
  id: number;
  name: string;
  description?: string;
}

// Price Range interface
export interface PriceRange {
  min: number;
  max: number;
}

// Port interface
export interface Port {
  id: number;
  type: string;
  quantity: number;
}

// Warranty interface
export interface Warranty {
  id: number;
  durationMonths: number;
  type: string;
  coverage: string;
  provider: string;
}

// Image interface
export interface LaptopImage {
  id: number;
  url: string;
  isMain: boolean;
  displayOrder: number;
}

// Variant interface (basic - used in laptop list)
export interface LaptopVariant {
  id: number;
  sku: string;
  ram: number;
  storage: number;
  storageType: string;
  currentPrice: number;
  stockStatus: string;
}

// Detailed Variant interface (used in variants API)
export interface LaptopVariantDetailed {
  id: number;
  sku: string;
  ram: number;
  storage: number;
  storageType: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  discountAmount?: number;
  stockQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  stockStatus: string;
  reorderLevel?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface VariantSelectorProps {
  variants: LaptopVariantDetailed[];
  selectedVariant: LaptopVariantDetailed | null;
  onVariantSelect: (variant: LaptopVariantDetailed) => void;
}

export interface LaptopVariantsClientProps {
  laptopId: number;
  token?: string;
}

// Laptop info in variants response
export interface LaptopVariantInfo {
  id: number;
  modelName: string;
  processor: string;
  gpu: string;
  screenSize: string;
  hasCamera: boolean;
  hasTouchScreen: boolean;
}

// Paginated variants response
export interface PaginatedVariantsResponse {
  items: LaptopVariantDetailed[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  startIndex: number;
  endIndex: number;
}

// Laptop variants API response
export interface LaptopVariantsResponse {
  laptop: LaptopVariantInfo;
  variants: PaginatedVariantsResponse;
}
export interface UseVariantsOptions {
  laptopId: number;
  page?: number;
  pageSize?: number;
  inStockOnly?: boolean;
  token?: string;
}

export interface UseVariantsReturn {
  variants: LaptopVariantDetailed[];
  laptopInfo: LaptopVariantInfo | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  refetch: () => void;
}
// Statistics interface
export interface LaptopStatistics {
  averageRating: number;
  totalReviews: number;
  totalSales: number;
  viewCount: number;
}

// Simple Laptop interface for list view
export interface Laptop {
  id: number;
  modelName: string;
  brand: Brand;
  category: Category;
  processor: string;
  gpu: string;
  screenSize: string;
  hasCamera: boolean;
  hasKeyboard: boolean;
  hasTouchScreen: boolean;
  releaseYear: number;
  isActive: boolean;
  variantCount: number;
  priceRange: PriceRange;
  averageRating: number;
  mainImage: string;
}

// Laptop Complete Details interface for single laptop view
export interface LaptopById {
  id: number;
  modelName: string;
  brand: Brand;
  category: Category;
  processor: string;
  gpu: string;
  screenSize: string;
  hasCamera: boolean;
  hasKeyboard: boolean;
  hasTouchScreen: boolean;
  description: string;
  releaseYear: number;
  storeLocation: string;
  storeContact: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  ports: Port[];
  warranty: Warranty;
  images: LaptopImage[];
  variants: LaptopVariant[];
  statistics: LaptopStatistics;
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