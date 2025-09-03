export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: "host-to-guest" | "guest-to-host";
  status: "pending" | "approved" | "rejected";
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface HostawayApiResponse {
  status: string;
  result: HostawayReview[];
}

export interface NormalizedReview {
  id: number;
  type: "host-to-guest" | "guest-to-host";
  status: "pending" | "approved" | "rejected";
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: Date;
  guestName: string;
  listingName: string;
  channel: "hostaway";
  averageCategoryRating: number;
  isTreated?: boolean;
}

export interface ReviewFilters {
  rating?: number;
  ratings?: number[];
  category?: string;
  channel?: string;
  listingName?: string;
  timeRange?: {
    start: Date;
    end: Date;
  };
  status?: "pending" | "approved" | "rejected";
  propertiesNeedingAttention?: boolean;
}

export interface SortOptions {
  field: "date" | "rating" | "guestName" | "listingName";
  direction: "asc" | "desc";
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  categoryStats: Record<string, { average: number; count: number }>;
  channelStats: Record<string, number>;
  recentTrends: {
    period: string;
    count: number;
    averageRating: number;
  }[];
}
