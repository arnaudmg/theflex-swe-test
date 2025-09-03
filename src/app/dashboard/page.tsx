"use client";
import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ReviewDashboard } from "@/components/dashboard/ReviewDashboard";
import { NormalizedReview, ReviewStats } from "@/types/reviews";

export default function DashboardPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews/hostaway");
      const data = await response.json();

      if (data.status === "success") {
        const normalizedData = data.data.map((review: NormalizedReview) => ({
          ...review,
          submittedAt: new Date(review.submittedAt),
        }));
        setReviews(normalizedData);
        calculateStats(normalizedData);
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError("Network error while fetching reviews");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const calculateStats = (reviewData: NormalizedReview[]) => {
    const totalReviews = reviewData.length;
    const approvedReviews = reviewData.filter((r) => r.status === "approved");

    const averageRating =
      approvedReviews.length > 0
        ? approvedReviews.reduce(
            (sum, r) => sum + (r.rating || r.averageCategoryRating),
            0
          ) / approvedReviews.length
        : 0;

    const ratingDistribution: Record<number, number> = {};
    approvedReviews.forEach((review) => {
      const rating = Math.round(review.rating || review.averageCategoryRating);
      ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
    });

    const categoryStats: Record<string, { average: number; count: number }> =
      {};
    approvedReviews.forEach((review) => {
      review.reviewCategory.forEach((cat) => {
        if (!categoryStats[cat.category]) {
          categoryStats[cat.category] = { average: 0, count: 0 };
        }
        categoryStats[cat.category].average += cat.rating;
        categoryStats[cat.category].count += 1;
      });
    });

    Object.keys(categoryStats).forEach((category) => {
      categoryStats[category].average =
        Math.round(
          (categoryStats[category].average / categoryStats[category].count) * 10
        ) / 10;
    });

    const channelStats: Record<string, number> = {
      hostaway: totalReviews,
    };

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentReviews = approvedReviews.filter(
      (r) => r.submittedAt >= thirtyDaysAgo
    );
    const recentAverageRating =
      recentReviews.length > 0
        ? recentReviews.reduce(
            (sum, r) => sum + (r.rating || r.averageCategoryRating),
            0
          ) / recentReviews.length
        : 0;

    const recentTrends = [
      {
        period: "Last 30 days",
        count: recentReviews.length,
        averageRating: Math.round(recentAverageRating * 10) / 10,
      },
    ];

    setStats({
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      categoryStats,
      channelStats,
      recentTrends,
    });
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <main className="bg-[#fffdf6] min-h-[718px] relative">
          <div className="h-[88px]" />
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[80px] pb-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center h-48">
                <div className="text-sm text-gray-600">Loading reviews...</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <main className="bg-[#fffdf6] min-h-[718px] relative">
          <div className="h-[88px]" />
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[80px] pb-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center h-48">
                <div className="text-sm text-red-600">Error: {error}</div>
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
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[80px] pb-6">
          <div className="max-w-[1200px] mx-auto">
            <ReviewDashboard
              reviews={reviews}
              stats={stats}
              onUpdateReview={(reviewId, updates) => {
                setReviews((prevReviews) =>
                  prevReviews.map((review) =>
                    review.id === reviewId ? { ...review, ...updates } : review
                  )
                );
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
