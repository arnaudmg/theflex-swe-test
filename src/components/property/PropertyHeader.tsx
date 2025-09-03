import { Users, Home, Bath, Bed } from "lucide-react";

interface PropertyHeaderProps {
  title?: string;
  description?: string;
}

export function PropertyHeader({
  title = "Exquisite Apartment in La Défense",
  description,
}: PropertyHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-xl sm:text-2xl lg:text-[30px] font-bold text-[#333333] leading-tight sm:leading-[36px] mb-6">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}

      <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full">
            <Users className="size-4 sm:size-5" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-[#333333]">3</div>
            <div className="text-xs sm:text-sm text-[#5c5c5a]">guests</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full">
            <Home className="size-4 sm:size-5" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-[#333333]">1</div>
            <div className="text-xs sm:text-sm text-[#5c5c5a]">bedrooms</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full">
            <Bath className="size-4 sm:size-5" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-[#333333]">1</div>
            <div className="text-xs sm:text-sm text-[#5c5c5a]">bathrooms</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full">
            <Bed className="size-4 sm:size-5" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-[#333333]">2</div>
            <div className="text-xs sm:text-sm text-[#5c5c5a]">beds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
