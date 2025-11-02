# Mock Data Setup

This document explains how to switch between mock laptop data and real backend API data.

## Current Status
✅ **Mock data is currently ENABLED**

## Using Mock Data (Default)

Mock data is currently enabled for testing purposes. The application will show 9 sample laptops with complete details.

### Features Available with Mock Data:
- ✅ Browse laptops on shop page (`/shop`)
- ✅ View individual laptop details (`/shop/[id]`)
- ✅ Search functionality
- ✅ Category filtering
- ✅ Complete laptop specifications
- ✅ Multiple product variants
- ✅ Product images and ratings

## Switching to Backend API

When your backend is ready and available, follow these simple steps:

### Step 1: Open the config file
```bash
src/lib/config.ts
```

### Step 2: Change the flag
Find this line:
```typescript
export const USE_MOCK_DATA = true;
```

Change it to:
```typescript
export const USE_MOCK_DATA = false;
```

### Step 3: Done! ✨
That's it! Your application will now fetch data from the real backend API.

## Files Modified

The following files were created/modified to support mock data:

1. **`src/lib/config.ts`** - Configuration flag to toggle between mock and real data
2. **`src/lib/mockData.ts`** - Mock laptop data (9 sample laptops)
3. **`src/lib/api.ts`** - Updated to check the config flag and return mock data when enabled

## Mock Data Details

The mock data includes:
- **9 laptops** from various brands (Dell, Apple, HP, Lenovo, ASUS, Microsoft, Acer, Razer)
- **3 categories**: Gaming, Professional, Ultrabook
- **Complete specifications**: processor, GPU, screen size, etc.
- **Multiple variants** per laptop with different RAM/storage configurations
- **Realistic pricing** ranging from $999 to $3,999
- **Product images** from Unsplash
- **Ratings and statistics**

## Testing

You can test the following pages:
- **Shop page**: http://localhost:3000/shop
- **Individual laptop**: http://localhost:3000/shop/1 (IDs 1-9 are available)
- **Search**: http://localhost:3000/shop?search=dell
- **Category filter**: http://localhost:3000/shop?categoryId=1

## Notes

- No code changes needed when switching - just toggle the flag
- Mock data works completely offline
- All existing features remain intact
- Authentication and other features are not affected
