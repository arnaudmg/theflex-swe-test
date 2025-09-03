"use client";
import { ReviewStats, NormalizedReview } from "@/types/reviews";
import { Star, MessageSquare, TrendingUp, CheckCircle } from "lucide-react";

interface ReviewStatsCardsProps {
  stats: ReviewStats;
  reviews: NormalizedReview[];
}

export function ReviewStatsCards({ stats, reviews }: ReviewStatsCardsProps) {
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Reviews */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Total Reviews</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.totalReviews}
            </p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="size-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Average Rating</p>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.averageRating}
              </p>
              <div className="flex items-center">
                <Star className="size-4 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Star className="size-5 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Published Reviews */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">
              Approved Reviews
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {approvedReviews}
            </p>
            <p className="text-xs text-gray-500">
              {stats.totalReviews > 0
                ? Math.round((approvedReviews / stats.totalReviews) * 100)
                : 0}
              % of total
            </p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="size-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Recent Reviews</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.recentTrends[0]?.count || 0}
            </p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-lg">
            <TrendingUp className="size-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
