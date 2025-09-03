"use client";
import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PropertyDetails } from "@/components/property/PropertyDetails";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PublicReviews } from "@/components/property/PublicReviews";
import { BookingPanel } from "@/components/property/BookingPanel";
import { AmenitiesModal } from "@/components/modals/AmenitiesModal";
import { GalleryModal } from "@/components/modals/GalleryModal";
import { NormalizedReview, HostawayReview } from "@/types/reviews";

interface HostawayResponse {
  status: string;
  data: HostawayReview[];
  message?: string;
}

interface PropertyPageClientProps {
  property: {
    name: string;
    description: string;
  };
}

export function PropertyPageClient({ property }: PropertyPageClientProps) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const fetchPropertyReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews/hostaway");
      const data: HostawayResponse = await response.json();

      if (data.status === "success") {
        const propertyReviews = data.data
          .map((review: HostawayReview) => ({
            ...review,
            submittedAt: new Date(review.submittedAt),
            channel: "hostaway" as const,
            averageCategoryRating:
              review.reviewCategory.length > 0
                ? review.reviewCategory.reduce(
                    (sum, cat) => sum + cat.rating,
                    0
                  ) / review.reviewCategory.length
                : review.rating || 0,
          }))
          .filter(
            (review) =>
              review.listingName === property.name &&
              review.status === "approved"
          );

        console.log(`Property: ${property.name}`);
        console.log(
          `Found ${propertyReviews.length} approved reviews for this property`
        );

        const allPropertyReviews = data.data.filter(
          (review: HostawayReview) => review.listingName === property.name
        );
        console.log(
          `Total reviews for ${property.name}:`,
          allPropertyReviews.length
        );
        console.log(
          "All reviews (all statuses):",
          allPropertyReviews.map((r: HostawayReview) => ({
            id: r.id,
            status: r.status,
            guest: r.guestName,
          }))
        );

        setReviews(propertyReviews);
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError("Network error while fetching reviews");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [property.name]);

  useEffect(() => {
    fetchPropertyReviews();
  }, [fetchPropertyReviews]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <main className="bg-[#fffdf6] min-h-[718px] relative">
          <div className="h-[88px]" />
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[80px] pb-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center h-48">
                <div className="text-sm text-gray-600">Loading property...</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="bg-[#fffdf6] min-h-[718px] relative">
        <div className="h-[88px]" />
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[95px] pb-8">
          <div className="max-w-[1280px] mx-auto relative">
            {/* Image Gallery */}
            <PropertyGallery
              onViewAllPhotos={() => setShowGalleryModal(true)}
            />

            {/* Property Title and Details */}
            <PropertyHeader
              title={property.name}
              description={property.description}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[821px_395px] gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <PropertyDetails
                  onShowAmenities={() => setShowAmenitiesModal(true)}
                />

                {/* Public Reviews Section */}
                <PublicReviews reviews={reviews} propertyName={property.name} />
              </div>

              {/* Right Column - Booking Panel */}
              <div className="relative order-first xl:order-last">
                <BookingPanel />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modals */}
      <AmenitiesModal
        isOpen={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
      />

      <GalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
      />
    </div>
  );
}
