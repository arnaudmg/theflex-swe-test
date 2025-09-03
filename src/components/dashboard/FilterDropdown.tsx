"use client";
import { useState } from "react";
import { ReviewFilters as ReviewFiltersType } from "@/types/reviews";
import { Filter, Calendar, Star, Tag, Globe, Clock } from "lucide-react";

interface FilterDropdownProps {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
  availableCategories: string[];
  availableProperties: string[];
  onPropertyClick?: (property: string) => void;
}

export function FilterDropdown({
  filters,
  onFiltersChange,
  availableCategories,
  availableProperties,
  onPropertyClick,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = Object.keys(filters).length > 0;

  const clearFilters = () => {
    onFiltersChange({});
  };

  const clearFilter = (filterKey: keyof ReviewFiltersType) => {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    onFiltersChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.rating) count++;
    if (filters.ratings?.length) count++;
    if (filters.category) count++;
    if (filters.channel) count++;
    if (filters.listingName) count++;
    if (filters.timeRange) count++;
    if (filters.status) count++;
    return count;
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
          hasActiveFilters
            ? "bg-[#284e4c] text-white border-[#284e4c]"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        <Filter className="size-4" />
        <span>Filter</span>
        {hasActiveFilters && (
          <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
            {getActiveFiltersCount()}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Filter</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#284e4c] hover:text-[#2d5a57] underline"
                  >
                    Reset all
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Property Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Tag className="size-3" />
                      Property
                    </label>
                    {filters.listingName && (
                      <button
                        onClick={() => clearFilter("listingName")}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <select
                    value={filters.listingName || ""}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      onFiltersChange({ ...filters, listingName: value });
                      if (value && onPropertyClick) {
                        onPropertyClick(value);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
                  >
                    <option value="">All Properties</option>
                    {availableProperties.map((property) => (
                      <option key={property} value={property}>
                        {property}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Star className="size-3" />
                      Rating
                    </label>
                    {(filters.rating || filters.ratings?.length) && (
                      <button
                        onClick={() => {
                          const newFilters = { ...filters };
                          delete newFilters.rating;
                          delete newFilters.ratings;
                          onFiltersChange(newFilters);
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => {
                        const isSelected =
                          filters.ratings?.includes(rating) || false;
                        return (
                          <button
                            key={rating}
                            onClick={() => {
                              const currentRatings = filters.ratings || [];
                              const newRatings = isSelected
                                ? currentRatings.filter((r) => r !== rating)
                                : [...currentRatings, rating];

                              const newFilters = { ...filters };
                              if (newRatings.length === 0) {
                                delete newFilters.ratings;
                              } else {
                                newFilters.ratings = newRatings;
                              }
                              // Remove old single rating filter
                              delete newFilters.rating;
                              onFiltersChange(newFilters);
                            }}
                            className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                              isSelected
                                ? "bg-[#284e4c] text-white border-[#284e4c]"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {rating} ⭐
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {filters.ratings?.length
                        ? `Selected: ${filters.ratings.join(", ")} stars`
                        : "Select ratings to filter"}
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Tag className="size-3" />
                      Category
                    </label>
                    {filters.category && (
                      <button
                        onClick={() => clearFilter("category")}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <select
                    value={filters.category || ""}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        category: e.target.value || undefined,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Globe className="size-3" />
                      Channel
                    </label>
                    {filters.channel && (
                      <button
                        onClick={() => clearFilter("channel")}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <select
                    value={filters.channel || ""}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        channel: e.target.value || undefined,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
                  >
                    <option value="">All channels</option>
                    <option value="hostaway">Hostaway</option>
                  </select>
                </div>

                {/* Time Range Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Clock className="size-3" />
                      Time Range
                    </label>
                    {filters.timeRange && (
                      <button
                        onClick={() => clearFilter("timeRange")}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="date"
                        value={
                          filters.timeRange?.start
                            ? filters.timeRange.start
                                .toISOString()
                                .split("T")[0]
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
                      />
                    </div>
                    <div>
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
                              end: e.target.value
                                ? new Date(e.target.value)
                                : new Date(),
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="size-3" />
                      Status
                    </label>
                    {filters.status && (
                      <button
                        onClick={() => clearFilter("status")}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <select
                    value={filters.status || ""}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        status:
                          (e.target.value as
                            | "pending"
                            | "approved"
                            | "rejected") || undefined,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
                  >
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Reset all
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-[#284e4c] text-white text-sm font-medium rounded-md hover:bg-[#2d5a57] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
