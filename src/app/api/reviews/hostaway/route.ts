import { NextRequest, NextResponse } from "next/server";
import {
  HostawayReview,
  NormalizedReview,
  HostawayApiResponse,
} from "@/types/reviews";

const reviewStatusChanges = new Map<
  number,
  "pending" | "approved" | "rejected"
>();

const mockHostawayReviews: HostawayReview[] = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "approved",
    rating: null,
    publicReview:
      "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "respect_house_rules", rating: 5 },
    ],
    submittedAt: "2025-08-21 22:45:14",
    guestName: "Roger Federer",
    listingName: "2B N1 A - 29 Shoreditch Heights",
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Amazing stay! The apartment was exactly as described and the location was perfect for our business trip. The host was very responsive and helpful.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2025-07-15 14:30:22",
    guestName: "Rafael Nadal",
    listingName: "Luxury Apartment - Shoreditch Heights",
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Great apartment with modern amenities. The check-in process was smooth and the host provided excellent recommendations for local restaurants.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "amenities", rating: 4 },
      { category: "check_in", rating: 5 },
    ],
    submittedAt: "2025-08-10 09:15:45",
    guestName: "Novak Djokovic",
    listingName: "Modern Studio - Canary Wharf",
  },
  {
    id: 7456,
    type: "guest-to-host",
    status: "approved",
    rating: 3,
    publicReview:
      "The apartment was nice but there were some issues with the WiFi connection during our stay. The host was quick to respond but couldn't resolve it completely.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 4 },
      { category: "amenities", rating: 2 },
      { category: "value", rating: 3 },
    ],
    submittedAt: "2025-09-05 16:45:12",
    guestName: "Serena Williams",
    listingName: "Cozy Flat - Camden Market",
  },
  {
    id: 7457,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Perfect location for exploring La Défense! The apartment was spotless and had everything we needed. Highly recommend!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-06-28 11:20:33",
    guestName: "Carlos Alcaraz",
    listingName: "2B N1 A - 29 Shoreditch Heights",
  },
  {
    id: 7458,
    type: "guest-to-host",
    status: "rejected",
    rating: 4,
    publicReview:
      "Good stay overall. The apartment was clean and well-equipped. Minor issue with the heating but the host was responsive.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 4 },
      { category: "amenities", rating: 3 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2025-09-20 13:10:15",
    guestName: "Iga Swiatek",
    listingName: "Modern Studio - Canary Wharf",
  },
  {
    id: 7459,
    type: "guest-to-host",
    status: "approved",
    rating: 2,
    publicReview:
      "The apartment was not as clean as expected and there were some maintenance issues. The host was apologetic and offered a partial refund.",
    reviewCategory: [
      { category: "cleanliness", rating: 2 },
      { category: "communication", rating: 4 },
      { category: "amenities", rating: 2 },
      { category: "value", rating: 2 },
    ],
    submittedAt: "2025-07-15 18:30:45",
    guestName: "Stefanos Tsitsipas",
    listingName: "Cozy Flat - Camden Market",
  },
  {
    id: 7460,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Absolutely perfect! The apartment exceeded all our expectations. The location was ideal and the host was incredibly helpful.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 5 },
    ],
    submittedAt: "2025-08-25 10:15:30",
    guestName: "Emma Raducanu",
    listingName: "Luxury Apartment - Shoreditch Heights",
  },
  {
    id: 7461,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Great value for money! The studio was clean and well-equipped. Perfect for a business trip to Canary Wharf.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "value", rating: 5 },
      { category: "location", rating: 4 },
      { category: "amenities", rating: 4 },
    ],
    submittedAt: "2025-07-22 16:45:12",
    guestName: "Jannik Sinner",
    listingName: "Modern Studio - Canary Wharf",
  },
  {
    id: 7462,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Stunning penthouse with incredible views! The location by the river is perfect and the apartment is beautifully furnished.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2025-09-05 14:20:15",
    guestName: "Holger Rune",
    listingName: "Riverside Penthouse - London Bridge",
  },
  {
    id: 7463,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Great apartment in a prime location. The check-in was smooth and the host was very accommodating.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
      { category: "check_in", rating: 4 },
    ],
    submittedAt: "2025-08-10 11:30:45",
    guestName: "Daniil Medvedev",
    listingName: "Riverside Penthouse - London Bridge",
  },
  {
    id: 7464,
    type: "guest-to-host",
    status: "rejected",
    rating: 3,
    publicReview:
      "The apartment was nice but there were some noise issues from the street. The host was responsive to our concerns.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 4 },
      { category: "location", rating: 2 },
      { category: "value", rating: 3 },
    ],
    submittedAt: "2025-09-15 16:45:30",
    guestName: "Aryna Sabalenka",
    listingName: "Riverside Penthouse - London Bridge",
  },
  {
    id: 7465,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Perfect for a romantic getaway! The apartment is cozy, well-decorated, and in a charming neighborhood.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 4 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-07-20 09:15:20",
    guestName: "Coco Gauff",
    listingName: "Victorian House - Notting Hill",
  },
  {
    id: 7466,
    type: "host-to-guest",
    status: "approved",
    rating: 5,
    publicReview:
      "Excellent guest! Very respectful and left the place spotless. Would definitely host again.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "respect_house_rules", rating: 5 },
      { category: "communication", rating: 5 },
    ],
    submittedAt: "2025-08-25 13:00:10",
    guestName: "Taylor Fritz",
    listingName: "Victorian House - Notting Hill",
  },
  {
    id: 7467,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Beautiful house with lots of character. The neighborhood is lovely and the host provided great local recommendations.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 3 },
    ],
    submittedAt: "2025-09-01 10:30:25",
    guestName: "Jessica Pegula",
    listingName: "Victorian House - Notting Hill",
  },
  {
    id: 7468,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Amazing modern apartment with all the amenities you could need. The gym and pool facilities are fantastic!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "location", rating: 4 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-08-05 15:45:40",
    guestName: "Ben Shelton",
    listingName: "Luxury Tower - Canary Wharf",
  },
  {
    id: 7469,
    type: "guest-to-host",
    status: "rejected",
    rating: 4,
    publicReview:
      "Great apartment with excellent facilities. The concierge service was very helpful throughout our stay.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 4 },
      { category: "amenities", rating: 5 },
      { category: "check_in", rating: 5 },
    ],
    submittedAt: "2025-09-10 12:20:15",
    guestName: "Madison Keys",
    listingName: "Luxury Tower - Canary Wharf",
  },
  {
    id: 7470,
    type: "guest-to-host",
    status: "approved",
    rating: 3,
    publicReview:
      "The apartment was okay but the building was quite noisy. The location is convenient for business trips though.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "location", rating: 4 },
      { category: "amenities", rating: 2 },
      { category: "value", rating: 3 },
    ],
    submittedAt: "2025-07-15 18:10:30",
    guestName: "Frances Tiafoe",
    listingName: "Luxury Tower - Canary Wharf",
  },
  {
    id: 7471,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Magnificent apartment in La Défense! Breathtaking view of the towers and very well equipped. Perfect for a business stay in Paris.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "communication", rating: 5 },
    ],
    submittedAt: "2025-08-20 14:30:15",
    guestName: "Karen Khachanov",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7472,
    type: "guest-to-host",
    status: "rejected",
    rating: 4,
    publicReview:
      "Very beautiful modern apartment with an exceptional view. The location is perfect for business. Only downside: the traffic noise.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 4 },
      { category: "amenities", rating: 4 },
      { category: "communication", rating: 4 },
    ],
    submittedAt: "2025-09-18 16:45:22",
    guestName: "Andrey Rublev",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7473,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Perfect stay! The apartment is luxurious and the view of La Défense is spectacular. The host was very responsive and helpful.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-07-12 11:20:45",
    guestName: "Casper Ruud",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7474,
    type: "guest-to-host",
    status: "rejected",
    rating: 3,
    publicReview:
      "The apartment is well located but there were some problems with the heating. The host tried to resolve it but without complete success.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 2 },
      { category: "communication", rating: 4 },
    ],
    submittedAt: "2025-08-08 19:15:30",
    guestName: "Matteo Berrettini",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7475,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Excellent location to discover Paris! The apartment is modern and comfortable. Recommended for a professional stay.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 4 },
      { category: "communication", rating: 4 },
    ],
    submittedAt: "2025-06-05 13:40:12",
    guestName: "Felix Auger-Aliassime",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7476,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Dream apartment! Incredible panoramic view, luxury amenities and exceptional host. A memorable stay in La Défense!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-07-28 10:25:18",
    guestName: "Cameron Norrie",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7477,
    type: "guest-to-host",
    status: "rejected",
    rating: 4,
    publicReview:
      "Very good stay in this modern apartment. The location is perfect for business. A few details to improve but overall satisfied.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 3 },
      { category: "communication", rating: 4 },
    ],
    submittedAt: "2025-09-25 15:50:33",
    guestName: "Hubert Hurkacz",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7478,
    type: "host-to-guest",
    status: "approved",
    rating: 5,
    publicReview:
      "Exemplary host! Very respectful of the apartment and the rules. Perfect communication. We highly recommend!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "respect_house_rules", rating: 5 },
      { category: "communication", rating: 5 },
    ],
    submittedAt: "2025-08-22 12:15:45",
    guestName: "Alexander Zverev",
    listingName: "Exquisite Apartment in La Défense",
  },
  {
    id: 7479,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Perfect apartment for a tech conference! The high-speed internet was excellent for my presentations. The host was very accommodating with my late check-in due to flight delays.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 4 },
    ],
    submittedAt: "2025-07-10 20:30:15",
    guestName: "Tim Berners-Lee",
    listingName: "Luxury Apartment - Shoreditch Heights",
  },
  {
    id: 7480,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Great location for exploring London's tech scene! The apartment had everything I needed for remote work. The host provided excellent recommendations for local tech meetups.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "amenities", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
    ],
    submittedAt: "2025-08-15 14:45:30",
    guestName: "Linus Torvalds",
    listingName: "Modern Studio - Canary Wharf",
  },
  {
    id: 7481,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Exceptional stay! The apartment was perfect for my research work. The quiet environment and excellent WiFi made it ideal for coding and writing. Highly recommend for tech professionals.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-09-12 11:20:45",
    guestName: "Ada Lovelace",
    listingName: "Victorian House - Notting Hill",
  },
  {
    id: 7482,
    type: "guest-to-host",
    status: "approved",
    rating: 4,
    publicReview:
      "Very comfortable apartment with great amenities. The host was knowledgeable about the local tech community and provided valuable insights. Perfect for business travelers in tech.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "amenities", rating: 4 },
      { category: "location", rating: 4 },
    ],
    submittedAt: "2025-06-25 16:15:20",
    guestName: "Alan Turing",
    listingName: "Riverside Penthouse - London Bridge",
  },
  {
    id: 7483,
    type: "guest-to-host",
    status: "rejected",
    rating: 5,
    publicReview:
      "Outstanding apartment with incredible views! The modern setup was perfect for my AI research work. The host went above and beyond to ensure my stay was comfortable.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
    ],
    submittedAt: "2025-09-28 09:30:10",
    guestName: "Grace Hopper",
    listingName: "Luxury Tower - Canary Wharf",
  },
  {
    id: 7484,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Exceptional property with world-class amenities! Perfect for business meetings and networking. The location in Canary Wharf is ideal for entrepreneurs like myself. The host was incredibly accommodating with my late-night work schedule.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "location", rating: 5 },
      { category: "communication", rating: 5 },
    ],
    submittedAt: "2025-08-12 22:15:30",
    guestName: "Elon Musk",
    listingName: "Luxury Tower - Canary Wharf",
  },
  {
    id: 7485,
    type: "guest-to-host",
    status: "pending",
    rating: 4,
    publicReview:
      "Great apartment for a tech entrepreneur's stay in London. The high-speed internet was perfect for my video calls with investors. The host understood the needs of business travelers and provided excellent service.",
    reviewCategory: [
      { category: "amenities", rating: 5 },
      { category: "communication", rating: 4 },
      { category: "location", rating: 4 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2025-09-22 14:45:15",
    guestName: "Jeff Bezos",
    listingName: "Modern Studio - Canary Wharf",
  },
  {
    id: 7486,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Outstanding experience! As someone who travels frequently for business, this apartment exceeded all expectations. The modern design and premium amenities made my stay in London truly memorable. Highly recommend for fellow entrepreneurs.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 5 },
      { category: "location", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2025-07-18 16:20:45",
    guestName: "Richard Branson",
    listingName: "Riverside Penthouse - London Bridge",
  },
  {
    id: 7487,
    type: "guest-to-host",
    status: "rejected",
    rating: 3,
    publicReview:
      "The apartment was decent but had some issues with the heating system during my stay. As a business owner, I need reliable amenities. The host was responsive but couldn't resolve the issue completely during my stay.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "amenities", rating: 2 },
      { category: "communication", rating: 4 },
      { category: "location", rating: 4 },
    ],
    submittedAt: "2025-08-30 11:30:20",
    guestName: "Bill Gates",
    listingName: "Victorian House - Notting Hill",
  },
  {
    id: 7488,
    type: "guest-to-host",
    status: "approved",
    rating: 5,
    publicReview:
      "Perfect for a successful business trip! The apartment's location in Shoreditch was ideal for exploring London's startup scene. The host provided excellent recommendations for networking events and business meetings in the area.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "location", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "amenities", rating: 4 },
    ],
    submittedAt: "2025-09-15 09:15:10",
    guestName: "Reid Hoffman",
    listingName: "Luxury Apartment - Shoreditch Heights",
  },
];

function normalizeReview(review: HostawayReview): NormalizedReview {
  const averageCategoryRating =
    review.reviewCategory.length > 0
      ? review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) /
        review.reviewCategory.length
      : review.rating || 0;

  const status = reviewStatusChanges.get(review.id) || review.status;

  return {
    ...review,
    status,
    submittedAt: new Date(review.submittedAt),
    channel: "hostaway",
    averageCategoryRating: Math.round(averageCategoryRating * 10) / 10,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId =
      searchParams.get("accountId") ||
      process.env.HOSTAWAY_ACCOUNT_ID ||
      "61148";
    const apiKey = searchParams.get("apiKey") || process.env.HOSTAWAY_API_KEY;

    // In a real implementation, we would make an API call here
    // const response = await fetch(`https://api.hostaway.com/v1/reviews?accountId=${accountId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    // For now, we'll use mock data
    const mockApiResponse: HostawayApiResponse = {
      status: "success",
      result: mockHostawayReviews,
    };

    // Normalize the reviews
    const normalizedReviews = mockApiResponse.result.map(normalizeReview);

    // Sort by submission date (newest first)
    normalizedReviews.sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );

    return NextResponse.json({
      status: "success",
      data: normalizedReviews,
      meta: {
        total: normalizedReviews.length,
        accountId,
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching Hostaway reviews:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch reviews from Hostaway API",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, status } = body;

    if (!reviewId || !status) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing reviewId or status",
        },
        { status: 400 }
      );
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid status. Must be pending, approved, or rejected",
        },
        { status: 400 }
      );
    }

    // Store the status change
    reviewStatusChanges.set(reviewId, status);

    return NextResponse.json({
      status: "success",
      message: "Review status updated successfully",
      data: {
        reviewId,
        status,
      },
    });
  } catch (error) {
    console.error("Error updating review status:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update review status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
