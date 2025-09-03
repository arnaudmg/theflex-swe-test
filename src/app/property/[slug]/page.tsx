import { PropertyPageClient } from "@/app/property/[slug]/PropertyPageClient";

const propertyMap: Record<string, { name: string; description: string }> = {
  "appartement-exquis-la-defense": {
    name: "Exquisite Apartment in La Défense",
    description:
      "Discover this exquisite apartment in La Défense with The Flex. Quality rental with all modern amenities.",
  },
  "luxury-tower-canary-wharf": {
    name: "Luxury Tower - Canary Wharf",
    description:
      "Modern luxury apartment in the financial district of Canary Wharf.",
  },
  "modern-studio-canary-wharf": {
    name: "Modern Studio - Canary Wharf",
    description:
      "Modern and elegant studio perfect for business stays in Canary Wharf.",
  },
  "riverside-penthouse-london-bridge": {
    name: "Riverside Penthouse - London Bridge",
    description:
      "Penthouse with spectacular views of the Thames, located near London Bridge.",
  },
  "victorian-house-notting-hill": {
    name: "Victorian House - Notting Hill",
    description:
      "Charming Victorian house in the bohemian neighborhood of Notting Hill.",
  },
  "luxury-apartment-shoreditch-heights": {
    name: "Luxury Apartment - Shoreditch Heights",
    description:
      "Luxury apartment in the creative and trendy neighborhood of Shoreditch.",
  },
  "cozy-flat-camden-market": {
    name: "Cozy Flat - Camden Market",
    description: "Cozy apartment near the famous Camden Market.",
  },
  "2b-n1-a-29-shoreditch-heights": {
    name: "2B N1 A - 29 Shoreditch Heights",
    description: "Modern apartment in the heights of Shoreditch.",
  },
};

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = propertyMap[slug];

  if (!property) {
    return (
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-center h-48">
          <div className="text-sm text-red-600">Property not found</div>
        </div>
      </div>
    );
  }

  return <PropertyPageClient property={property} />;
}
