"use client";
import React from "react";
import { GalleryImage } from "../ui/GalleryImage";
import { Camera } from "lucide-react";

interface PropertyGalleryProps {
  onViewAllPhotos: () => void;
}

export function PropertyGallery({ onViewAllPhotos }: PropertyGalleryProps) {
  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[616px_300px_300px] grid-rows-1 sm:grid-rows-2 lg:grid-rows-2 gap-2 sm:gap-4 rounded-xl overflow-hidden">
      {/* Main image (large) */}
      <GalleryImage
        src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-YkrpSNQo87LO4eUyG-MD9bK8Hz--25x8cpTYguejoB2s-6748c58ecaf0c"
        alt="Main apartment"
        className="col-span-1 sm:col-span-2 lg:col-span-1 row-span-1 sm:row-span-2 lg:row-span-2 rounded-tl-xl sm:rounded-l-xl lg:rounded-l-xl"
      />

      {/* Image 2 - Bedroom */}
      <GalleryImage
        src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-oGBhy7BavhtxUNt--1bEUL2AsvF3YZqw7wG--tYH8Go2w-6748c58db4d28"
        alt="Bedroom"
        className="hidden sm:block lg:block"
      />

      {/* Image 3 - Bathroom */}
      <GalleryImage
        src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-4fmsLAmYztRzJ--pVP1ImZtD9DM3KG77BP9z8Wjtc9DI-67489b22d0534"
        alt="Bathroom"
        className="hidden sm:block lg:block"
      />

      {/* Image 4 - Kitchen */}
      <GalleryImage
        src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-CFmSihsahSjq--9ZH8ddeA65Pu5qN-Ef96r8Xfe5sk4g-67489b214747b"
        alt="Kitchen"
        className="hidden sm:block lg:block"
      />

      {/* Image 5 - Living Room */}
      <GalleryImage
        src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-hvftuX0QEUZXAWiwc9wdyE893Q0DYMaSufG97h4RzK8-6748c58c69edf"
        alt="Living Room"
        className="hidden sm:block lg:block"
      >
        {/* View all photos button */}
        <button
          onClick={onViewAllPhotos}
          className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors z-10"
        >
          <Camera className="size-3 sm:size-4" />
          <span className="hidden sm:inline">View all photos</span>
          <span className="sm:hidden">Photos</span>
        </button>
      </GalleryImage>

      {/* Mobile view all photos button */}
      <button
        onClick={onViewAllPhotos}
        className="sm:hidden absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors z-10"
      >
        <Camera className="size-4" />
        View all photos
      </button>
    </div>
  );
}
