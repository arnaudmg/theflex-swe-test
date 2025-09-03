"use client";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  Wifi,
  Tv,
  Coffee,
  WashingMachine,
  ArrowUpDown,
  Scissors,
  Thermometer,
  Shield,
  Heart,
  Clock,
} from "lucide-react";

function smartTruncate(text: string, limit: number) {
  if (text.length <= limit) return { isLong: false, truncated: text };
  const slice = text.slice(0, limit);
  // avoid cutting a word in the middle
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return { isLong: true, truncated: base.trimEnd() + "..." };
}

type ExpandableTextProps = {
  text: string;
  charLimit?: number;
  className?: string;
  moreLabel?: string;
  lessLabel?: string;
};

function ExpandableText({
  text,
  charLimit = 300,
  className,
  moreLabel = "Read more",
  lessLabel = "Read less",
}: ExpandableTextProps) {
  const [{ isLong, truncated }] = useMemo(
    () => [smartTruncate(text, charLimit)],
    [text, charLimit]
  );
  const [expanded, setExpanded] = useState(false);

  const display = expanded || !isLong ? text : truncated;

  return (
    <div className={className}>
      <p className="text-[#5c5c5a] leading-[26px] mb-4">{display}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[#284e4c] text-sm font-medium hover:underline transition-all"
          aria-expanded={expanded}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </div>
  );
}

interface PropertyDetailsProps {
  onShowAmenities: () => void;
}

const FULL_TEXT = `The apartment is located in La Défense, an ideal place to explore
Paris while enjoying a modern and dynamic environment. It
is spacious, comfortable, and equipped with everything you need with
quality amenities. You'll find everything nearby: shops,
restaurants and public transport. It's a perfect place for a
practical and pleasant stay, I'm sure you'll feel
at home! This apartment has a bedroom with a double bed,
a bathroom and a modern kitchen with
quality equipment. The bed linen is 100% cotton and all
duvets and pillows are hypoallergenic. The living room is large, and
an air mattress is available for a 3rd person. In total,
the apartment can accommodate 3 people. A perfect place to
relax and enjoy your stay! Your comfort is my
priority, so if you need anything or if I
can help you in any way, don't hesitate to let me
know, I'll always be happy to assist you!
The apartment is located in La Défense, a modern and
dynamic neighborhood, perfect for exploring Paris while being away from
the hustle and bustle. You're just a few minutes by transport from
the main attractions of the capital, with shops,
restaurants and offices all around. It's an ideal place for a
practical and pleasant stay, offering excellent access to
public transport. You'll love the location! Five Guys
Paris La Défense Grande Arche - 19 minutes walk Lunicco - 22
minutes walk Nanterre-La-Folie-RER - 11 minutes walk Upon
your arrival, you will be asked to present a valid
ID and accept our terms and conditions. These steps
are put in place to ensure a secure and smooth process
for everyone. Thank you very much for your understanding!
, metro (line 1, RER A), shopping centers like Les Quatre Temps, and many gourmet restaurants. The apartment has a magnificent view of the La Défense skyline and offers all modern comfort: equipped kitchen, high-speed Wi-Fi, washing machine, and much more.`;

export function PropertyDetails({ onShowAmenities }: PropertyDetailsProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* About this property */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#333333] mb-4">
          About this property
        </h2>

        <ExpandableText text={FULL_TEXT} charLimit={300} />

        {/* If you prefer to change the labels:
        <ExpandableText text={FULL_TEXT} charLimit={300} moreLabel="See more" lessLabel="See less" />
        */}
      </div>

      {/* Amenities */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#333333]">
            Amenities
          </h2>
          <button
            onClick={onShowAmenities}
            className="border border-[#284e4c]/20 px-4 py-2 rounded-md text-sm font-medium text-[#284e4c] flex items-center gap-2 hover:bg-[#284e4c]/5 transition-colors self-start sm:self-auto"
          >
            View all amenities
            <ChevronDown className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            Wireless
          </div>
          <div className="flex items-center gap-3">
            <Coffee className="size-4" />
            Kitchen
          </div>
          <div className="flex items-center gap-3">
            <WashingMachine className="size-4" />
            Washing Machine
          </div>
          <div className="flex items-center gap-3">
            <ArrowUpDown className="size-4" />
            Elevator
          </div>
          <div className="flex items-center gap-3">
            <Scissors className="size-4" />
            Hair Dryer
          </div>
          <div className="flex items-center gap-3">
            <Thermometer className="size-4" />
            Heating
          </div>
          <div className="flex items-center gap-3">
            <Shield className="size-4" />
            Smoke detector
          </div>
        </div>
      </div>

      {/* Stay Policies */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#333333] mb-6">
          Stay Policies
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {/* Check-in & Check-out */}
          <div className="bg-[#f1f3ee] p-4 sm:p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="size-4 sm:size-5 text-[#284e4c]" />
              <h3 className="text-base sm:text-lg font-semibold text-[#333333]">
                Check-in & Check-out
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <div className="text-sm text-[#5c5c5a] mb-1">Check-in time</div>
                <div className="text-base sm:text-lg font-semibold text-[#333333]">
                  3:00 PM
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <div className="text-sm text-[#5c5c5a] mb-1">
                  Check-out time
                </div>
                <div className="text-base sm:text-lg font-semibold text-[#333333]">
                  10:00 AM
                </div>
              </div>
            </div>
          </div>

          {/* House Rules */}
          <div className="bg-[#f1f3ee] p-4 sm:p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="size-4 sm:size-5 text-[#284e4c]" />
              <h3 className="text-base sm:text-lg font-semibold text-[#333333]">
                House Rules
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg flex items-center gap-3">
                <Shield className="size-4 sm:size-5" />
                No smoking
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg flex items-center gap-3">
                <Heart className="size-4 sm:size-5" />
                No pets
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg flex items-center gap-3">
                <Shield className="size-4 sm:size-5" />
                No parties or events
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg flex items-center gap-3">
                <Shield className="size-4 sm:size-5" />
                Security deposit required
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-[#f1f3ee] p-4 sm:p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="size-4 sm:size-5 text-[#284e4c]" />
              <h3 className="text-base sm:text-lg font-semibold text-[#333333]">
                Cancellation Policy
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-medium text-[#333333] text-base sm:text-xl mb-4">
                  For stays less than 28 days
                </h4>
                <ul className="space-y-2 text-sm text-[#5c5c5a]">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#284e4c] rounded-full mt-2 flex-shrink-0"></div>
                    Full refund up to 14 days before check-in
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#284e4c] rounded-full mt-2 flex-shrink-0"></div>
                    No refund for bookings less than 14 days before check-in
                  </li>
                </ul>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-medium text-[#333333] text-base sm:text-xl mb-4">
                  For stays of 28 days or more
                </h4>
                <ul className="space-y-2 text-sm text-[#5c5c5a]">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#284e4c] rounded-full mt-2 flex-shrink-0"></div>
                    Full refund up to 30 days before check-in
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#284e4c] rounded-full mt-2 flex-shrink-0"></div>
                    No refund for bookings less than 30 days before check-in
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#333333] mb-6">
          Location
        </h2>
        <div className="h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
          <iframe
            title="Google Map - 10 Rue de Rivoli, Paris"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999646238437!2d2.352221615674049!3d48.85661407928709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e5aaf1%3A0x40b82c3688c9460!2s10%20Rue%20de%20Rivoli%2C%2075004%20Paris%2C%20France!5e0!3m2!1sen!2sfr!4v1717690000000!5m2!1sen!2sfr"
          ></iframe>
        </div>
      </div>

      <div className="text-sm sm:text-base text-[#284e4c]">
        Discover more{" "}
        <a href="#" className="underline">
          monthly rentals in Paris
        </a>
      </div>
    </div>
  );
}
