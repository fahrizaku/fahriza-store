"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const MediaGallery = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // Jika tidak ada media, gunakan placeholder
  if (!media || media.length === 0) {
    return (
      <div className="relative w-full h-64 sm:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Tidak ada gambar</span>
      </div>
    );
  }

  const currentMedia = media[currentIndex];

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openLightbox = (index, e) => {
    if (e) e.stopPropagation();
    setLightboxIndex(index);
    setShowLightbox(true);
    setIsVideoPlaying(false);
  };

  const closeLightbox = (e) => {
    if (e) e.stopPropagation();
    setShowLightbox(false);
    setIsVideoPlaying(false);
  };

  const handleLightboxPrevious = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? media.length - 1 : prevIndex - 1;
      setIsVideoPlaying(false);
      return newIndex;
    });
  };

  const handleLightboxNext = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prevIndex) => {
      const newIndex = prevIndex === media.length - 1 ? 0 : prevIndex + 1;
      setIsVideoPlaying(false);
      return newIndex;
    });
  };

  const playVideo = (e) => {
    if (e) e.stopPropagation();
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Thumbnail component
  const Thumbnail = ({ item, index, isActive, onClick }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
        isActive ? "border-orange-500" : "border-transparent"
      }`}
    >
      <Image
        src={item.thumbnail}
        alt={item.caption || `Media ${index + 1}`}
        width={100}
        height={100}
        className="w-16 h-16 object-cover"
      />
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Play className="h-6 w-6 text-white" />
        </div>
      )}
    </div>
  );

  // Video Thumbnail component
  const VideoThumbnail = ({ media, onClick }) => (
    <div
      className="relative w-full h-64 sm:h-80 md:h-96 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={media.thumbnail}
        alt={media.caption || "Video thumbnail"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-30 transition-all">
        <div className="bg-white bg-opacity-80 rounded-full p-4 shadow-lg hover:bg-opacity-100 transition-all">
          <Play className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
        </div>
      </div>
      {media.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
          {media.caption}
        </div>
      )}
    </div>
  );

  // Lightbox component
  const Lightbox = () => {
    const lightboxMedia = media[lightboxIndex];

    return (
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
        onClick={closeLightbox}
      >
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-[60]"
        >
          <X className="h-8 w-8" />
        </button>

        <div className="flex items-center justify-center w-full h-full">
          <button
            onClick={handleLightboxPrevious}
            className="absolute left-4 text-white hover:text-gray-300 z-[60]"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <div
            className="w-full h-full max-w-4xl max-h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxMedia.type === "image" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={lightboxMedia.url}
                  alt={lightboxMedia.caption || `Media ${lightboxIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : isVideoPlaying ? (
              <video
                ref={videoRef}
                src={lightboxMedia.url}
                controls
                autoPlay
                className="max-h-full max-w-full"
                poster={lightboxMedia.thumbnail}
                onClick={(e) => e.stopPropagation()}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="relative w-full max-w-4xl cursor-pointer"
                onClick={playVideo}
              >
                <Image
                  src={lightboxMedia.thumbnail}
                  alt={lightboxMedia.caption || "Video thumbnail"}
                  width={1200}
                  height={800}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-80 rounded-full p-5 shadow-lg hover:bg-opacity-100 transition-all">
                    <Play className="h-12 w-12 text-orange-600" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLightboxNext}
            className="absolute right-4 text-white hover:text-gray-300 z-[60]"
            aria-label="Next media"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>

        {lightboxMedia.caption && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white p-2 z-[60]">
            <p className="text-sm">{lightboxMedia.caption}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Main media display */}
      {currentMedia.type === "image" ? (
        <div
          className="relative rounded-lg overflow-hidden shadow-sm border border-gray-100 mb-2 cursor-pointer"
          onClick={(e) => openLightbox(currentIndex, e)}
        >
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <Image
              src={currentMedia.url}
              alt={currentMedia.caption || `Media ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Caption for image */}
          {currentMedia.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
              {currentMedia.caption}
            </div>
          )}
        </div>
      ) : (
        <VideoThumbnail
          media={currentMedia}
          onClick={(e) => openLightbox(currentIndex, e)}
        />
      )}

      {/* Navigation buttons */}
      {media.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-[20%] sm:top-[25%] md:top-[30%] transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-1 shadow hover:bg-opacity-100 z-10"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-[20%] sm:top-[25%] md:top-[30%] transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-1 shadow hover:bg-opacity-100 z-10"
            aria-label="Next media"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto py-2">
          {media.map((item, index) => (
            <Thumbnail
              key={index}
              item={item}
              index={index}
              isActive={currentIndex === index}
              onClick={(e) => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && <Lightbox />}
    </div>
  );
};

export default MediaGallery;
