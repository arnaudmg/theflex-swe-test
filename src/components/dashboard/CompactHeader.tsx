"use client";
import { NormalizedReview, ReviewStats } from "@/types/reviews";
import {
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

interface CompactHeaderProps {
  reviews: NormalizedReview[];
  stats: ReviewStats | null;
  onBacklogClick?: () => void;
  onNormalModeClick?: () => void;
  isBacklogActive?: boolean;
}

export function CompactHeader({
  reviews,
  onBacklogClick,
  onNormalModeClick,
  isBacklogActive = false,
}: CompactHeaderProps) {
  // Calculate 30-day weighted average
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const reviews30d = reviews.filter((r) => r.submittedAt >= thirtyDaysAgo);
  const approved30d = reviews30d.filter((r) => r.status === "approved");
  const avg30d =
    approved30d.length > 0
      ? approved30d.reduce(
          (sum, r) => sum + (r.rating || r.averageCategoryRating),
          0
        ) / approved30d.length
      : 0;

  // Calculate 90-day weighted average
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const reviews90d = reviews.filter((r) => r.submittedAt >= ninetyDaysAgo);
  const approved90d = reviews90d.filter((r) => r.status === "approved");
  const avg90d =
    approved90d.length > 0
      ? approved90d.reduce(
          (sum, r) => sum + (r.rating || r.averageCategoryRating),
          0
        ) / approved90d.length
      : 0;

  // Calculate approval rate
  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r) => r.status === "approved").length;
  const approvalRate =
    totalReviews > 0 ? (approvedReviews / totalReviews) * 100 : 0;

  // Calculate channel distribution
  const channelStats = reviews.reduce((acc, review) => {
    acc[review.channel] = (acc[review.channel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate top 3 declining categories
  const categoryStats = reviews.reduce((acc, review) => {
    review.reviewCategory.forEach((cat) => {
      if (!acc[cat.category]) {
        acc[cat.category] = { total: 0, sum: 0, recent: 0, recentSum: 0 };
      }
      acc[cat.category].total++;
      acc[cat.category].sum += cat.rating;

      if (review.submittedAt >= thirtyDaysAgo) {
        acc[cat.category].recent++;
        acc[cat.category].recentSum += cat.rating;
      }
    });
    return acc;
  }, {} as Record<string, { total: number; sum: number; recent: number; recentSum: number }>);

  const decliningCategories = Object.entries(categoryStats)
    .map(([category, data]) => {
      const overallAvg = data.sum / data.total;
      const recentAvg =
        data.recent > 0 ? data.recentSum / data.recent : overallAvg;
      return {
        category,
        decline: overallAvg - recentAvg,
        recentAvg: Math.round(recentAvg * 10) / 10,
      };
    })
    .filter((cat) => cat.decline > 0)
    .sort((a, b) => b.decline - a.decline)
    .slice(0, 3);

  // Calculate backlog (only pending reviews)
  const backlog = reviews.filter((r) => r.status === "pending").length;

  const cards = [
    {
      title: "30d Average",
      value: Math.round(avg30d * 10) / 10,
      subtitle: `${approved30d.length} reviews`,
      icon: Star,
      color: isBacklogActive ? "bg-white" : "bg-[#284e4c]",
      textColor: isBacklogActive ? "text-[#333333]" : "text-white",
      subtitleColor: isBacklogActive ? "text-[#284e4c]" : "text-green-100",
      trend: avg30d > avg90d ? "+" : "-",
      trendValue: Math.abs(Math.round((avg30d - avg90d) * 10) / 10),
      clickable: true,
    },
    {
      title: "90d Average",
      value: Math.round(avg90d * 10) / 10,
      subtitle: `${approved90d.length} reviews`,
      icon: BarChart3,
      color: "bg-white",
      textColor: "text-[#333333]",
      subtitleColor: "text-[#284e4c]",
      trend: avg90d > 0 ? "+" : "0",
      trendValue: Math.round(avg90d * 10) / 10,
    },
    {
      title: "30d Volume",
      value: reviews30d.length,
      subtitle: `${Math.round(
        ((reviews30d.length - reviews90d.length) /
          Math.max(reviews90d.length, 1)) *
          100
      )}% vs 90j`,
      icon: MessageSquare,
      color: "bg-white",
      textColor: "text-[#333333]",
      subtitleColor: "text-[#284e4c]",
      trend: reviews30d.length > reviews90d.length ? "+" : "-",
      trendValue: Math.abs(reviews30d.length - reviews90d.length),
    },
    {
      title: "Approval Rate",
      value: `${Math.round(approvalRate)}%`,
      subtitle: `${approvedReviews}/${totalReviews} approved`,
      icon: CheckCircle,
      color: "bg-white",
      textColor: "text-[#333333]",
      subtitleColor: "text-[#284e4c]",
      trend: approvalRate > 80 ? "+" : "-",
      trendValue: Math.round(approvalRate),
    },
    {
      title: "Channel Distribution",
      value: Object.keys(channelStats).length,
      subtitle: `${Object.values(channelStats)[0] || 0} Hostaway`,
      icon: TrendingUp,
      color: "bg-white",
      textColor: "text-[#333333]",
      subtitleColor: "text-[#284e4c]",
      trend: "+",
      trendValue: Object.keys(channelStats).length,
    },
    {
      title: "Backlog",
      value: backlog,
      subtitle:
        decliningCategories.length > 0
          ? `${decliningCategories[0].category} declining`
          : "No decline",
      icon: Clock,
      color: isBacklogActive ? "bg-[#284e4c]" : "bg-white",
      textColor: isBacklogActive ? "text-white" : "text-[#333333]",
      subtitleColor: isBacklogActive ? "text-green-100" : "text-[#284e4c]",
      trend: backlog > 0 ? "-" : "+",
      trendValue: backlog,
      clickable: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => {
        const isFirstCard = index === 0;

        return (
          <div
            key={card.title}
            className={`${
              card.color
            } p-4 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden ${
              isFirstCard ? "border-[#284e4c]" : ""
            } ${
              card.clickable
                ? "cursor-pointer hover:shadow-md transition-shadow"
                : ""
            }`}
            onClick={
              card.clickable
                ? card.title === "Backlog"
                  ? onBacklogClick
                  : onNormalModeClick
                : undefined
            }
          >
            {/* Background gradient for first card - only when not in backlog mode */}
            {isFirstCard && !isBacklogActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#284e4c] to-[#2d5a57] rounded-xl" />
            )}

            {/* Background gradient for backlog card when active */}
            {card.title === "Backlog" && isBacklogActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#284e4c] to-[#2d5a57] rounded-xl" />
            )}

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    className={`text-xs font-medium ${
                      (isFirstCard && !isBacklogActive) ||
                      (card.title === "Backlog" && isBacklogActive)
                        ? "text-white"
                        : "text-gray-600"
                    } mb-1`}
                  >
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold ${card.textColor}`}>
                    {card.value}
                  </p>
                </div>

                {/* Action icon */}
                <div
                  className={`p-2 rounded-full ${
                    (isFirstCard && !isBacklogActive) ||
                    (card.title === "Backlog" && isBacklogActive)
                      ? "bg-white/20"
                      : "bg-gray-100"
                  }`}
                >
                  <ArrowUpRight
                    className={`size-4 ${
                      (isFirstCard && !isBacklogActive) ||
                      (card.title === "Backlog" && isBacklogActive)
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  />
                </div>
              </div>

              {/* Subtitle with trend */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  {card.trend === "+" ? (
                    <TrendingUp className="size-3 text-green-600" />
                  ) : card.trend === "-" ? (
                    <TrendingDown className="size-3 text-red-600" />
                  ) : (
                    <div className="size-3" />
                  )}
                  <span className={`text-xs ${card.subtitleColor}`}>
                    {card.subtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
