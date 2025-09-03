"use client";
import { useState, useEffect } from "react";
import { Users, ChevronDown, Check, Heart, Gift } from "lucide-react";

export function BookingPanel() {
  const [showGuestsMenu, setShowGuestsMenu] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  // Close dropdowns when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-guest-selector]")) {
        setShowGuestsMenu(false);
      }
    };

    if (showGuestsMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showGuestsMenu]);

  return (
    <div className="sticky top-[95px]">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#284e4c] p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
            Book your stay
          </h3>
          <p className="text-[#d2dada] text-xs">
            Select dates to see the total price
          </p>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Date and Guest Selection */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="flex-1 bg-[#f1f3ee] border rounded-md sm:rounded-l-md px-3 py-2 flex items-center gap-2">
              <Users className="size-4" />
              <span className="text-sm">Sep 05 - Oct 30</span>
            </div>

            {/* Guest selector */}
            <div
              className="relative w-full sm:w-[120px] cursor-pointer"
              data-guest-selector
              onClick={() => setShowGuestsMenu(!showGuestsMenu)}
            >
              <div className="w-full bg-[#f1f3ee] border rounded-md sm:rounded-r-md px-3 py-2 flex items-center justify-between hover:bg-[#e5e7e0] transition-colors">
                <span className="flex items-center gap-2">
                  <Users className="size-4" />
                  <span className="font-medium tabular-nums text-sm">
                    {guestCount}
                  </span>
                </span>
                <ChevronDown
                  className={`size-4 opacity-50 transition-transform ${
                    showGuestsMenu ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showGuestsMenu && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border py-1 z-[9999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {[1, 2, 3, 4].map((count) => (
                    <div
                      key={count}
                      className={`px-4 py-2 text-sm cursor-pointer flex justify-center ${
                        guestCount === count
                          ? "bg-[#284e4c] text-white font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setGuestCount(count);
                        setShowGuestsMenu(false);
                      }}
                    >
                      {count}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#5c5c5a]">Check-in</span>
              <span className="font-medium text-[#333333]">Sep 05</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5c5c5a]">Check-out</span>
              <span className="font-medium text-[#333333]">Oct 30</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5c5c5a]">Guests</span>
              <span className="font-medium text-[#333333]">
                {guestCount} guest{guestCount > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#5c5c5a]">Base price (56 nights)</span>
              <span className="font-medium text-[#333333]">€10,218.78</span>
            </div>

            <div className="bg-gradient-to-r from-[#f0fdf44d] to-[#dcfce74d] border border-[#dcfce780] p-2 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Gift className="size-3.5 text-green-600" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-green-700">
                  20% length of stay discount
                </span>
              </div>
              <span className="font-medium text-green-700 text-sm">
                -€2,043.99
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#5c5c5a]">Cleaning fee</span>
              <span className="font-medium text-[#333333]">€87.75</span>
            </div>

            {/* Coupon Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Gift className="size-4 text-[#284e4c]" />
                <span className="text-sm font-medium text-[#284e4c]">
                  Have a coupon code?
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full bg-[#f1f3ee] border border-[#284e4c]/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#284e4c]/30 transition-colors"
                />
                <button
                  onClick={() => {
                    if (couponCode.trim()) {
                      alert(`Promo code "${couponCode}" applied!`);
                      // Here you could add the coupon validation logic
                    }
                  }}
                  disabled={!couponCode.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs font-medium text-[#284e4c] transition-opacity ${
                    couponCode.trim()
                      ? "opacity-100 hover:bg-[#284e4c]/10 rounded cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <div>
                <div className="text-base sm:text-lg font-semibold text-[#333333]">
                  Total
                </div>
              </div>
              <div className="text-right">
                <div className="text-base sm:text-lg font-bold text-[#333333]">
                  €8,262.54
                </div>
                <div className="text-xs text-[#284e4c]">
                  You saved €2,043.99
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mb-3">
            <button
              onClick={() => alert("Redirecting to payment page...")}
              className="w-full bg-[#284e4c] text-white py-2 sm:py-3 rounded-md font-medium flex items-center justify-center gap-2 shadow-lg hover:bg-[#1f3a38] transition-colors text-sm sm:text-base"
            >
              <Check className="size-4" />
              Book Now
            </button>
            <button
              onClick={() => alert("Inquiry form sent!")}
              className="w-full border border-[#284e4c]/20 text-[#284e4c] py-2 sm:py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#284e4c]/5 transition-colors text-sm sm:text-base"
            >
              <Heart className="size-4" />
              Send Inquiry
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-[#5c5c5a]">
            <Check className="size-3" />
            Instant confirmation
          </div>
        </div>
      </div>
    </div>
  );
}
