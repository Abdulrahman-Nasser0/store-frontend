"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square sm:aspect-w-16 sm:aspect-h-9 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <span className="text-gray-400">No image</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image: square on mobile, 4:3 on md, 16:9 on lg+ */}
      <div className="aspect-square md:aspect-4/3 lg:aspect-video bg-gray-200 rounded-lg overflow-hidden relative group max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto max-h-[75vw] sm:max-h-[60vw] md:max-h-[400px] lg:max-h-[480px]">
        <Image
          src={images[selectedImageIdx]}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-full object-cover transition-all duration-200"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-2 px-2 justify-center sm:justify-start">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImageIdx(index)}
              className={`border-2 rounded-lg overflow-hidden focus:outline-none transition-all duration-150 shrink-0 cursor-pointer ${
                selectedImageIdx === index
                  ? 'border-blue-500 ring-2 ring-blue-300 shadow-md'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              style={{ minWidth: 64, minHeight: 64, width: 64, height: 64 }}
              aria-label={`Show image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-16 h-16"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
