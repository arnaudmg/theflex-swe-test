"use client";
import { useState } from "react";
import { NormalizedReview } from "@/types/reviews";
import { Home, Star, ChevronDown, ChevronRight } from "lucide-react";

interface PropertyStatsProps {
  reviews: NormalizedReview[];
}

export function PropertyStats({ reviews }: PropertyStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group reviews by property
  const propertyStats = reviews.reduce(
    (acc, review) => {
      const propertyName = review.listingName;
      if (!acc[propertyName]) {
        acc[propertyName] = {
          name: propertyName,
          totalReviews: 0,
          averageRating: 0,
          publishedReviews: 0,
          ratings: [] as number[],
        };
      }

      acc[propertyName].totalReviews++;
      if (review.status === "approved") {
        acc[propertyName].publishedReviews++;
        const rating = review.rating || review.averageCategoryRating;
        acc[propertyName].ratings.push(rating);
      }

      return acc;
    },
    {} as Record<
      string,
      {
        name: string;
        totalReviews: number;
        averageRating: number;
        publishedReviews: number;
        ratings: number[];
      }
    >
  );

  // Calculate average ratings
  Object.values(propertyStats).forEach((property) => {
    if (property.ratings.length > 0) {
      property.averageRating =
        Math.round(
          (property.ratings.reduce((sum, rating) => sum + rating, 0) /
            property.ratings.length) *
            10
        ) / 10;
    }
  });

  const properties = Object.values(propertyStats).sort(
    (a, b) => b.totalReviews - a.totalReviews
  );

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Home className="size-5 text-blue-600" />
          <h3 className="text-base font-medium text-gray-900">
            Statistics by Property
          </h3>
          <span className="text-sm text-gray-500">
            ({properties.length} properties)
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="size-5 text-gray-400" />
        ) : (
          <ChevronRight className="size-5 text-gray-400" />
        )}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div
                key={property.name}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {property.name}
                  </h4>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Total Reviews:</span>
                    <span className="font-medium text-gray-900">
                      {property.totalReviews}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-medium text-gray-900">
                      {property.publishedReviews}
                    </span>
                  </div>

                  {property.averageRating > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Avg Rating:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-900">
                          {property.averageRating}
                        </span>
                        <Star className="size-3 text-yellow-400 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
