"use client";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

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

export default function PropertiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="bg-[#fffdf6] min-h-[718px] relative">
        <div className="h-[88px]" />
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[80px] pb-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Our Properties
              </h1>
              <p className="text-gray-600">
                Discover our selection of premium properties in London and Paris
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(propertyMap).map(([slug, property]) => (
                <Link
                  key={slug}
                  href={`/property/${slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-[#284e4c] rounded-lg">
                      <Home className="size-6 text-white" />
                    </div>
                    <ArrowRight className="size-5 text-gray-400 group-hover:text-[#284e4c] transition-colors" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#284e4c] transition-colors">
                    {property.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {property.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#284e4c] text-white rounded-lg hover:bg-[#2d5a57] transition-colors"
              >
                <Home className="size-4" />
                Manage Reviews
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
