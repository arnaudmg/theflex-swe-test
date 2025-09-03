import {
  X,
  Tv,
  Wifi,
  Coffee,
  WashingMachine,
  ArrowUpDown,
  Scissors,
  Thermometer,
  Shield,
  Refrigerator,
  Microwave,
  Utensils,
  Droplets,
  Square,
} from "lucide-react";

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AmenitiesModal({ isOpen, onClose }: AmenitiesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#333333]">
              All Amenities
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-[#333333]">Comfort</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Tv className="size-4" />
                  Cable TV
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="size-4" />
                  Internet
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="size-4" />
                  Wireless Internet
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="size-4" />
                  Air Conditioning
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="size-4" />
                  Heating
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-[#333333]">Kitchen & Dining</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Coffee className="size-4" />
                  Kitchen
                </div>
                <div className="flex items-center gap-3">
                  <Refrigerator className="size-4" />
                  Refrigerator
                </div>
                <div className="flex items-center gap-3">
                  <Microwave className="size-4" />
                  Microwave
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="size-4" />
                  Coffee Machine
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="size-4" />
                  Dishwasher
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-[#333333]">Bathroom</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Scissors className="size-4" />
                  Hair Dryer
                </div>
                <div className="flex items-center gap-3">
                  <Square className="size-4" />
                  Towels
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="size-4" />
                  Shower
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-[#333333]">
                Safety & Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="size-4" />
                  Smoke Detector
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="size-4" />
                  Security System
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="size-4" />
                  Safe
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-[#333333]">Other</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <WashingMachine className="size-4" />
                  Washing Machine
                </div>
                <div className="flex items-center gap-3">
                  <ArrowUpDown className="size-4" />
                  Elevator
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="size-4" />
                  Iron
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
