"use client";
import { useState, useMemo } from "react";
import {
  NormalizedReview,
  ReviewStats,
  ReviewFilters,
  SortOptions,
} from "@/types/reviews";
import { ReviewStatsCards } from "./ReviewStatsCards";
import { FilterDropdown } from "./FilterDropdown";
import { SortDropdown } from "./SortDropdown";
import { ReviewList } from "./ReviewList";

import { PropertyStats } from "./PropertyStats";
import { CompactHeader } from "./CompactHeader";
import { Download } from "lucide-react";

interface ReviewDashboardProps {
  reviews: NormalizedReview[];
  stats: ReviewStats | null;
  onUpdateReview?: (
    reviewId: number,
    updates: Partial<NormalizedReview>
  ) => void;
}

export function ReviewDashboard({
  reviews,
  stats,
  onUpdateReview,
}: ReviewDashboardProps) {
  const [filters, setFilters] = useState<ReviewFilters>({});
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "date",
    direction: "desc",
  });
  const [showBacklogOnly, setShowBacklogOnly] = useState(false);

  const filteredAndSortedReviews = useMemo(() => {
    const filtered = reviews.filter((review) => {
      if (showBacklogOnly) {
        if (review.status !== "pending") {
          return false;
        }
      }

      if (filters.rating) {
        if ((review.rating || review.averageCategoryRating) < filters.rating) {
          return false;
        }
      }
      if (filters.ratings && filters.ratings.length > 0) {
        const reviewRating = Math.round(
          review.rating || review.averageCategoryRating
        );
        if (!filters.ratings.includes(reviewRating)) {
          return false;
        }
      }
      if (
        filters.category &&
        !review.reviewCategory.some((cat) => cat.category === filters.category)
      ) {
        return false;
      }
      if (filters.channel && review.channel !== filters.channel) {
        return false;
      }
      if (filters.listingName && review.listingName !== filters.listingName) {
        return false;
      }
      if (filters.status && review.status !== filters.status) {
        return false;
      }
      if (filters.timeRange) {
        const reviewDate = review.submittedAt;
        if (
          reviewDate < filters.timeRange.start ||
          reviewDate > filters.timeRange.end
        ) {
          return false;
        }
      }

      if (filters.propertiesNeedingAttention) {
        const rating = review.rating || review.averageCategoryRating;
        if (rating > 3.0) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortOptions.field) {
        case "date":
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
          break;
        case "rating":
          aValue = a.rating || a.averageCategoryRating;
          bValue = b.rating || b.averageCategoryRating;
          break;
        case "guestName":
          aValue = a.guestName.toLowerCase();
          bValue = b.guestName.toLowerCase();
          break;
        case "listingName":
          aValue = a.listingName.toLowerCase();
          bValue = b.listingName.toLowerCase();
          break;
        default:
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
      }

      if (sortOptions.direction === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return sorted;
  }, [reviews, filters, sortOptions, showBacklogOnly]);

  const handleExportReviews = () => {
    const csvContent = [
      [
        "ID",
        "Guest Name",
        "Property",
        "Rating",
        "Review",
        "Categories",
        "Date",
        "Status",
      ],
      ...filteredAndSortedReviews.map((review) => [
        review.id,
        review.guestName,
        review.listingName,
        review.rating || review.averageCategoryRating,
        review.publicReview.replace(/"/g, '""'),
        review.reviewCategory
          .map((cat) => `${cat.category}:${cat.rating}`)
          .join(";"),
        review.submittedAt.toISOString().split("T")[0],
        review.status,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reviews-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Review Management Dashboard
          </h1>
          <p className="text-gray-600 mt-0.5 text-sm">
            For the staff of the best renting startup in the world :))) (please
            hire ^^)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportReviews}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="size-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Compact Header with 6 Key Metrics */}
      {stats && (
        <CompactHeader
          reviews={reviews}
          stats={stats}
          isBacklogActive={showBacklogOnly}
          onBacklogClick={() => {
            setShowBacklogOnly(!showBacklogOnly);
            if (!showBacklogOnly) {
              setFilters({});
            }
          }}
          onNormalModeClick={() => {
            setShowBacklogOnly(false);
            setFilters({});
          }}
          onPropertiesNeedingAttentionClick={() => {
            setFilters({ propertiesNeedingAttention: true });
            setShowBacklogOnly(false);
          }}
        />
      )}

      {/* Legacy Stats Cards - Hidden for now */}
      {false && stats && <ReviewStatsCards stats={stats!} reviews={reviews} />}

      {/* Backlog Mode Indicator */}
      {showBacklogOnly && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">
                Backlog Mode active - Showing pending reviews only
              </span>
            </div>
            <button
              onClick={() => setShowBacklogOnly(false)}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              View all reviews
            </button>
          </div>
        </div>
      )}

      {/* Properties Needing Attention Filter Indicator */}
      {filters.propertiesNeedingAttention && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-red-800">
                Showing only low-rated reviews (≤ 3.0 stars)
              </span>
            </div>
            <button
              onClick={() => setFilters({})}
              className="text-xs text-red-600 hover:text-red-800 underline"
            >
              View all reviews
            </button>
          </div>
        </div>
      )}

      {/* Property Statistics */}
      <PropertyStats reviews={reviews} />

      {/* Filter and Sort Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FilterDropdown
            filters={filters}
            onFiltersChange={setFilters}
            availableCategories={Array.from(
              new Set(
                reviews.flatMap((r) => r.reviewCategory.map((c) => c.category))
              )
            )}
            availableProperties={Array.from(
              new Set(reviews.map((r) => r.listingName))
            ).sort()}
            onPropertyClick={(property) => {
              setFilters({ ...filters, listingName: property });
            }}
          />
          <SortDropdown
            sortOptions={sortOptions}
            onSortChange={setSortOptions}
          />
        </div>
        <div className="text-sm text-gray-600">
          {filteredAndSortedReviews.length} of {reviews.length} reviews
        </div>
      </div>

      {/* Reviews List */}
      <ReviewList
        reviews={filteredAndSortedReviews}
        onReviewAction={async (reviewId, action) => {
          console.log(`${action} review ${reviewId}`);

          if (action === "contact") {
            const review = reviews.find((r) => r.id === reviewId);
            if (review) {
              const subject = `Review ${reviewId} - ${review.guestName}`;
              const body = `Hello,%0D%0A%0D%0ARegarding review ID ${reviewId} from ${review.guestName} for ${review.listingName}.%0D%0A%0D%0AReview: "${review.publicReview}"%0D%0A%0D%0AThank you.`;
              window.open(
                `mailto:theflex@theflex.com?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`
              );
            }
            return;
          }

          let newStatus: "pending" | "approved" | "rejected";

          switch (action) {
            case "publish":
              newStatus = "approved";
              break;
            case "reject":
              newStatus = "rejected";
              break;
            case "unpublish":
              newStatus = "pending";
              break;
            case "unreject":
              newStatus = "pending";
              break;
            default:
              return;
          }

          try {
            const response = await fetch("/api/reviews/hostaway", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                reviewId,
                status: newStatus,
              }),
            });

            const result = await response.json();

            if (result.status === "success" && onUpdateReview) {
              onUpdateReview(reviewId, {
                status: newStatus,
              });
            } else {
              console.error("Failed to update review status:", result.message);
            }
          } catch (error) {
            console.error("Error updating review status:", error);
          }
        }}
      />
    </div>
  );
}
