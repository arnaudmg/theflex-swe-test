import Image from "next/image";

// Composant pour les images de la galerie
export function GalleryImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={src.includes("MD9bK8Hz")}
      />
      <div className="absolute inset-0 bg-black/10" />
      {children}
    </div>
  );
}
