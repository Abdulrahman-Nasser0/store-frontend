import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLaptopById } from '@/lib/api';
import { getSession } from '@/lib/session';
import { Button } from '@/components/common/Button';

interface LaptopDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function LaptopDetails({ params }: LaptopDetailsProps) {
  const { id } = await params;
  const session = await getSession();
  const token = session?.token;

  const response = await getLaptopById(id, token);

  if (!response.isSuccess || !response.data) {
    notFound();
  }

  const laptop = response.data;

  // Images - sort by display order
  const images = laptop.images && laptop.images.length > 0
    ? laptop.images
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(img => img.url)
    : ['/fallback.jpeg'];

  // Statistics
  const averageRating = laptop.statistics.averageRating.toFixed(1);
  const reviewsCount = laptop.statistics.totalReviews;

  // Ports list
  const portsText = laptop.ports && laptop.ports.length > 0
    ? laptop.ports.map(port => `${port.quantity}x ${port.type}`).join(', ')
    : 'No ports specified';

  // Warranty info
  const warrantyText = laptop.warranty
    ? `${laptop.warranty.durationMonths} months ${laptop.warranty.type} by ${laptop.warranty.provider}`
    : 'No warranty information';

  // Specifications
  const specifications = [
    { label: 'Brand', value: laptop.brand.name },
    { label: 'Model', value: laptop.modelName },
    { label: 'Processor', value: laptop.processor },
    { label: 'GPU', value: laptop.gpu },
    { label: 'Screen Size', value: laptop.screenSize },
    { label: 'Release Year', value: laptop.releaseYear.toString() },
    { label: 'Camera', value: laptop.hasCamera ? 'Yes' : 'No' },
    { label: 'Keyboard', value: laptop.hasKeyboard ? 'Yes' : 'No' },
    { label: 'Touch Screen', value: laptop.hasTouchScreen ? 'Yes' : 'No' },
    { label: 'Ports', value: portsText },
    { label: 'Store Location', value: laptop.storeLocation },
    { label: 'Store Contact', value: laptop.storeContact },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link href="/shop" className="text-gray-700 hover:text-blue-600 ml-1 md:ml-2">
                  Shop
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-gray-500 ml-1 md:ml-2">{laptop.modelName}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={images[0]}
                alt={laptop.modelName}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${laptop.modelName} ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {laptop.category?.name || 'Unknown Category'}
                </span>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">{averageRating}</span>
                  <span className="text-sm text-gray-500">({reviewsCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{laptop.modelName}</h1>
              <p className="text-gray-600 text-lg">{laptop.description}</p>
            </div>

            {/* Warranty */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Warranty Information</h3>
                <p className="text-gray-700">{warrantyText}</p>
                {laptop.warranty && (
                  <p className="text-sm text-gray-600">{laptop.warranty.coverage}</p>
                )}
              </div>
            </div>

            {/* Variants */}
            {laptop.variants && laptop.variants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Configurations</h3>
                <div className="space-y-3">
                  {laptop.variants.map((variant) => (
                    <div 
                      key={variant.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {variant.ram}GB RAM • {variant.storage}GB {variant.storageType}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">SKU: {variant.sku}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Status: <span className={`font-medium ${variant.stockStatus === 'InStock' ? 'text-green-600' : 'text-red-600'}`}>
                              {variant.stockStatus}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            ${variant.currentPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="primary"
                fullWidth
                className="font-medium"
              >
                Add to Cart
              </Button>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {specifications.map((spec, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{spec.label}: {spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Product Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{laptop.statistics.averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600 mt-2">Average Rating</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{laptop.statistics.totalReviews}</div>
              <div className="text-sm text-gray-600 mt-2">Total Reviews</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{laptop.statistics.totalSales}</div>
              <div className="text-sm text-gray-600 mt-2">Units Sold</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">{laptop.statistics.viewCount}</div>
              <div className="text-sm text-gray-600 mt-2">Views</div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center text-gray-500">
              {reviewsCount === 0 ? (
                <p>No reviews yet for this product.</p>
              ) : (
                <p>{reviewsCount} reviews with an average rating of {averageRating} stars</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="text-center text-gray-500">
            <p>Related products will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}