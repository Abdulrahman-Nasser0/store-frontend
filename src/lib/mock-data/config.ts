// ========================================
// 🔧 MOCK DATA CONFIGURATION
// ========================================
// 
// 📝 CURRENT STATUS: Mock data is ENABLED
// 
// When to use TRUE:
//   ✅ Backend is not available
//   ✅ Testing without server
//   ✅ Offline development
// 
// When to use FALSE:
//   ✅ Backend API is live and ready
//   ✅ Ready for production
// 
// ========================================

export const USE_MOCK_DATA = true;

// ========================================
// 🚀 HOW TO SWITCH TO BACKEND (3 seconds):
// ========================================
// 1. Change USE_MOCK_DATA to false above
// 2. Save this file
// 3. Done! App now uses real backend data
// ========================================

// Re-export mock data functions for convenience
export { getMockLaptops, getMockLaptopById, getMockLaptopVariants } from './mockData';
