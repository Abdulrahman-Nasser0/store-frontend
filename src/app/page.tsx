
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Laptop</h1>
          <p className="text-xl mb-8">Premium laptops for work, gaming, and everything in between</p>
          <Link href="/signup" className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold text-lg">
            Get Started
          </Link>
        </div>
      </div>


      
    </div>
  );
}

