"use client";
import { ReviewFilters as ReviewFiltersType } from "@/types/reviews";
import { X } from "lucide-react";

interface ReviewFiltersProps {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
  availableCategories: string[];
}

export function ReviewFilters({
  filters,
  onFiltersChange,
  availableCategories,
}: ReviewFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-gray-900">Filter Reviews</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
          >
            <X className="size-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Rating Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <select
            value={filters.rating || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                rating: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
            <option value="2">2+ stars</option>
            <option value="1">1+ stars</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                category: e.target.value || undefined,
              })
            }
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Channel
          </label>
          <select
            value={filters.channel || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                channel: e.target.value || undefined,
              })
            }
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All channels</option>
            <option value="hostaway">Hostaway</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                status:
                  (e.target.value as "approved" | "pending" | "rejected") ||
                  undefined,
              })
            }
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All statuses</option>
            <option value="approved">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="flex gap-1.5">
            <input
              type="date"
              value={
                filters.timeRange?.start
                  ? filters.timeRange.start.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  timeRange: {
                    start: e.target.value
                      ? new Date(e.target.value)
                      : new Date(0),
                    end: filters.timeRange?.end || new Date(),
                  },
                })
              }
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="date"
              value={
                filters.timeRange?.end
                  ? filters.timeRange.end.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  timeRange: {
                    start: filters.timeRange?.start || new Date(0),
                    end: e.target.value ? new Date(e.target.value) : new Date(),
                  },
                })
              }
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
