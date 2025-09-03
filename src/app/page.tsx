"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main property page
    router.push("/property/appartement-exquis-la-defense");
  }, [router]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg text-gray-600 mb-2">Redirecting...</div>
        <div className="text-sm text-gray-500">
          You will be redirected to the Exquisite Apartment in La Défense
        </div>
      </div>
    </div>
  );
}
