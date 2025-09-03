"use client";
import { NormalizedReview } from "@/types/reviews";
import {
  Star,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Home,
  Mail,
  XCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface ReviewListProps {
  reviews: NormalizedReview[];
  onReviewAction?: (
    reviewId: number,
    action: "publish" | "reject" | "unpublish" | "unreject" | "contact"
  ) => void;
}

export function ReviewList({ reviews, onReviewAction }: ReviewListProps) {
  // Function to convert property name to slug
  const getPropertySlug = (propertyName: string): string => {
    const slugMap: Record<string, string> = {
      "Exquisite Apartment in La Défense": "appartement-exquis-la-defense",
      "Luxury Tower - Canary Wharf": "luxury-tower-canary-wharf",
      "Modern Studio - Canary Wharf": "modern-studio-canary-wharf",
      "Riverside Penthouse - London Bridge":
        "riverside-penthouse-london-bridge",
      "Victorian House - Notting Hill": "victorian-house-notting-hill",
      "Luxury Apartment - Shoreditch Heights":
        "luxury-apartment-shoreditch-heights",
      "Cozy Flat - Camden Market": "cozy-flat-camden-market",
      "2B N1 A - 29 Shoreditch Heights": "2b-n1-a-29-shoreditch-heights",
    };
    return slugMap[propertyName] || "";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="size-3 text-green-600" />;
      case "pending":
        return <Clock className="size-3 text-yellow-600" />;
      case "rejected":
        return <XCircle className="size-3 text-red-600" />;
      default:
        return <Clock className="size-3 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 text-center">
        <div className="text-gray-500 text-base">
          No reviews found matching your filters
        </div>
        <div className="text-gray-400 text-xs mt-1">
          Try adjusting your filter criteria
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            {/* Review Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {renderStars(review.rating || review.averageCategoryRating)}
                  </div>
                  <span className="text-base font-medium text-gray-900">
                    {review.rating || review.averageCategoryRating}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Badge */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg ${getStatusColor(
                        review.status
                      )}`}
                    >
                      {getStatusIcon(review.status)}
                      <span className="capitalize">{review.status}</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {onReviewAction && (
                    <div className="flex items-center gap-1">
                      {/* Actions based on status */}
                      {review.status === "pending" && (
                        <>
                          <button
                            onClick={() => onReviewAction(review.id, "publish")}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer"
                          >
                            <CheckCircle className="size-3" />
                            <span>Publish</span>
                          </button>
                          <button
                            onClick={() => onReviewAction(review.id, "reject")}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            <XCircle className="size-3" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {review.status === "approved" && (
                        <button
                          onClick={() => onReviewAction(review.id, "unpublish")}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          <Clock className="size-3" />
                          <span>Unpublish</span>
                        </button>
                      )}

                      {review.status === "rejected" && (
                        <button
                          onClick={() => onReviewAction(review.id, "unreject")}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          <Clock className="size-3" />
                          <span>Unreject</span>
                        </button>
                      )}

                      {/* Contact Button - Always available */}
                      <button
                        onClick={() => onReviewAction(review.id, "contact")}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        <Mail className="size-3" />
                        <span>Contact</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                {review.publicReview}
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {review.reviewCategory.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-xs font-medium"
                  >
                    <span className="text-slate-500">
                      {category.category
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {category.rating}
                    </span>
                  </span>
                ))}
              </div>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="size-3" />
                  <span>{review.guestName}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Home className="size-3" />
                  <span className="font-medium">Property:</span>
                  {getPropertySlug(review.listingName) ? (
                    <Link
                      href={`/property/${getPropertySlug(review.listingName)}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{review.listingName}</span>
                      <ExternalLink className="size-3" />
                    </Link>
                  ) : (
                    <span>{review.listingName}</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span>{review.submittedAt.toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-medium">Channel:</span>
                  <span className="capitalize">{review.channel}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">
                    {review.type.replace(/-/g, " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
