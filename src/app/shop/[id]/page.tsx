import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLaptopById } from '@/lib/api';
import { getSession } from '@/lib/session';

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

  // Mock additional details for a complete product page
  const specifications = {
    processor: 'Intel Core i7-12700H',
    ram: '16GB DDR4',
    storage: '512GB SSD',
    display: '15.6" FHD (1920x1080)',
    graphics: 'NVIDIA RTX 3050 4GB',
    battery: 'Up to 8 hours',
    weight: '2.1 kg',
    os: 'Windows 11 Pro'
  };

  const features = [
    'High-performance gaming laptop',
    'Latest generation processor',
    'Dedicated graphics card',
    'Fast SSD storage',
    'Full HD display',
    'Long battery life',
    'Premium build quality'
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
                <span className="text-gray-500 ml-1 md:ml-2">{laptop.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={laptop.images[0]}
                alt={laptop.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
                priority
              />
            </div>
            {laptop.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {laptop.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${laptop.name} ${index + 2}`}
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
                  {laptop.category}
                </span>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">{laptop.rate.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({laptop.reviewsCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{laptop.name}</h1>
              <p className="text-gray-600 text-lg">{laptop.shortDescription}</p>
            </div>

            {/* Pricing */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-center space-x-4">
                {laptop.isDiscounted && laptop.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">${laptop.discountedPrice}</span>
                    <span className="text-xl text-gray-500 line-through">${laptop.price}</span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Save ${(laptop.price - laptop.discountedPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-blue-600">${laptop.price}</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium">
                Add to Wishlist
              </button>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {Object.entries(specifications).map(([key, value], index) => (
                <div key={key} className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center text-gray-500">
              <p>Reviews will be displayed here once customers start purchasing this product.</p>
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