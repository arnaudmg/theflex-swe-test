import Image from "next/image";
import { X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Photo Gallery</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="size-6 text-white" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-YkrpSNQo87LO4eUyG-MD9bK8Hz--25x8cpTYguejoB2s-6748c58ecaf0c"
              alt="Main apartment"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-oGBhy7BavhtxUNt--1bEUL2AsvF3YZqw7wG--tYH8Go2w-6748c58db4d28"
              alt="Bedroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-4fmsLAmYztRzJ--pVP1ImZtD9DM3KG77BP9z8Wjtc9DI-67489b22d0534"
              alt="Bathroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-CFmSihsahSjq--9ZH8ddeA65Pu5qN-Ef96r8Xfe5sk4g-67489b214747b"
              alt="Kitchen"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/130509-334945-hvftuX0QEUZXAWiwc9wdyE893Q0DYMaSufG97h4RzK8-6748c58c69edf"
              alt="Living Room"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
            + More photos available
          </div>
        </div>
      </div>
    </div>
  );
}
