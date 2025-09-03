"use client";
import { useState } from "react";
import { NormalizedReview } from "@/types/reviews";
import { Star, ArrowUpRight } from "lucide-react";

interface PublicReviewsProps {
  reviews: NormalizedReview[];
  propertyName?: string;
}

export function PublicReviews({ reviews }: PublicReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-3.5 ${
          i < Math.floor(rating)
            ? "text-[#284e4c] fill-current"
            : "text-gray-200"
        }`}
      />
    ));
  };
  const getAvatarInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-[#284e4c]",
      "bg-[#2d5a57]",
      "bg-[#3a6b68]",
      "bg-[#4a7c79]",
      "bg-[#5a8d8a]",
      "bg-[#6a9e9b]",
      "bg-[#7aafac]",
      "bg-[#8ac0bd]",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Guest Reviews
          </h3>
          <p className="text-gray-600 text-sm">
            No approved reviews available at the moment.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#333333]">
            Guest Reviews
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Manage Reviews
            <ArrowUpRight className="size-3.5" />
          </a>
          <button className="bg-[#284e4c] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#2d5a57] transition-colors">
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col space-y-4">
        {(showAll ? reviews : reviews.slice(0, 3)).map((review) => (
          <div
            key={review.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-50 hover:shadow-md hover:border-gray-100 transition-all duration-300"
          >
            {/* Avatar and Name */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full ${getAvatarColor(
                  review.guestName
                )} flex items-center justify-center text-white font-medium text-sm shadow-sm`}
              >
                {getAvatarInitials(review.guestName)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-base mb-0.5">
                  {review.guestName}
                </h4>
                <p className="text-xs text-gray-400">Guest</p>
              </div>
            </div>

            {/* Review Text */}
            <blockquote className="text-gray-600 mb-4 leading-relaxed text-sm italic">
              &ldquo;{review.publicReview}&rdquo;
            </blockquote>

            {/* Date and Rating */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="text-xs text-gray-400">
                {review.submittedAt.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-0.5">
                {renderStars(review.rating || review.averageCategoryRating)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more/less button */}
      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#284e4c] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#2d5a57] transition-colors"
          >
            {showAll ? "Show less" : `View all reviews (${reviews.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
