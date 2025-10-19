import Link from "next/link";
import Image from "next/image";

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


interface LaptopCardProps {
  laptop: Laptop;
}

export default function LaptopCard({ laptop }: LaptopCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <Image
          src={laptop.images[0]}
          alt={laptop.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {laptop.category}
          </span>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600">{laptop.rate.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({laptop.reviewsCount})</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{laptop.name}</h3>
        <p className="text-gray-600 mb-4">{laptop.shortDescription}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {laptop.isDiscounted && laptop.discountedPrice ? (
              <>
                <span className="text-lg font-bold text-red-600">${laptop.discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">${laptop.price}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-blue-600">${laptop.price}</span>
            )}
          </div>
          <Link
            href={`/shop/${laptop.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}