import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  labels?: string[];
  title: string;
}

const ImageGallery = ({ images, labels, title }: ImageGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
        <div
          className="col-span-4 md:col-span-2 md:row-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={labels?.[0] || title}
            className="w-full h-full min-h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {labels?.[0] && (
            <span className="absolute bottom-2 left-2 bg-background/90 text-foreground text-xs px-2 py-1 rounded">
              {labels[0]}
            </span>
          )}
        </div>
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="col-span-2 md:col-span-1 relative cursor-pointer group"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image}
              alt={labels?.[index + 1] || `${title} ${index + 2}`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {labels?.[index + 1] && (
              <span className="absolute bottom-2 left-2 bg-background/90 text-foreground text-xs px-2 py-1 rounded">
                {labels[index + 1]}
              </span>
            )}
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
          <div className="relative flex items-center justify-center min-h-[70vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20 z-10"
              onClick={() => navigate("prev")}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <img
              src={images[currentIndex]}
              alt={labels?.[currentIndex] || `${title} ${currentIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20 z-10"
              onClick={() => navigate("next")}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {images.length}
              {labels?.[currentIndex] && (
                <span className="ml-2 text-white/70">— {labels[currentIndex]}</span>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
