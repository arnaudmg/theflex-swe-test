"use client";
import { useState } from "react";
import { SortOptions } from "@/types/reviews";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortDropdownProps {
  sortOptions: SortOptions;
  onSortChange: (sortOptions: SortOptions) => void;
}

export function SortDropdown({ sortOptions, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortFields = [
    { value: "date", label: "Date" },
    { value: "rating", label: "Rating" },
    { value: "guestName", label: "Guest Name" },
    { value: "listingName", label: "Property" },
  ] as const;

  const getSortLabel = () => {
    const field = sortFields.find((f) => f.value === sortOptions.field);
    return field ? field.label : "Date";
  };

  return (
    <div className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <ArrowUpDown className="size-4" />
        <span>Sort</span>
        <span className="text-xs text-gray-500">
          {getSortLabel()} {sortOptions.direction === "asc" ? "↑" : "↓"}
        </span>
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
                <h3 className="text-sm font-semibold text-gray-900">Sort by</h3>
              </div>

              <div className="space-y-3">
                {/* Sort Field */}
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Field
                  </label>
                  <select
                    value={sortOptions.field}
                    onChange={(e) =>
                      onSortChange({
                        ...sortOptions,
                        field: e.target.value as SortOptions["field"],
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#284e4c] focus:border-[#284e4c]"
                  >
                    {sortFields.map((field) => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Direction */}
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">
                    Direction
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onSortChange({
                          ...sortOptions,
                          direction: "asc",
                        })
                      }
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md border transition-colors ${
                        sortOptions.direction === "asc"
                          ? "bg-[#284e4c] text-white border-[#284e4c]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <ArrowUp className="size-3" />
                      Ascending
                    </button>
                    <button
                      onClick={() =>
                        onSortChange({
                          ...sortOptions,
                          direction: "desc",
                        })
                      }
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md border transition-colors ${
                        sortOptions.direction === "desc"
                          ? "bg-[#284e4c] text-white border-[#284e4c]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <ArrowDown className="size-3" />
                      Descending
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
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
