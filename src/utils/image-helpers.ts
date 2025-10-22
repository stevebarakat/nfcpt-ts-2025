import React from "react";

/**
 * Utility functions for handling image URLs and fallbacks
 */

// Default fallback images
export const FALLBACK_IMAGES = {
  hero: "/images/carAccident.webp",
  featured:
    "http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fnfcpt%2Fimages%2Ff_webp%2Cq_auto%2Fv1735799593%2Fchiropractic-serivces%2Fchiropractic-serivces.jpg%3F_i%3DAA&w=1920&q=75",
  general: "/images/notFound.webp",
} as const;

/**
 * Checks if an image URL is from localhost (development)
 */
export function isLocalhostUrl(url: string): boolean {
  return url.includes("localhost:8080") || url.includes("127.0.0.1:8080");
}

/**
 * Replaces localhost URLs with production URLs
 */
export function replaceLocalhostWithProduction(url: string): string {
  if (isLocalhostUrl(url)) {
    // Replace localhost:8080 with your production WordPress URL
    return url.replace(
      /http:\/\/localhost:8080/,
      "https://www.northfloridachiropracticphysicaltherapy.com"
    );
  }
  return url;
}

/**
 * Gets a safe image URL with fallback
 */
export function getSafeImageUrl(
  originalUrl: string | undefined | null,
  fallbackType: keyof typeof FALLBACK_IMAGES = "general"
): string {
  if (!originalUrl) {
    return FALLBACK_IMAGES[fallbackType];
  }

  // Replace localhost URLs with production URLs
  const processedUrl = replaceLocalhostWithProduction(originalUrl);

  return processedUrl;
}

/**
 * Handles image loading errors with fallback
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string
): void {
  const target = event.currentTarget;
  console.error("Image failed to load:", target.src);

  // Only fallback if we haven't already tried the fallback
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  } else {
    // If fallback also fails, hide the image
    target.style.display = "none";
  }
}

/**
 * Hook for managing image fallbacks with React state
 */
export function useImageFallback(initialUrl: string, fallbackUrl: string) {
  const [currentUrl, setCurrentUrl] = React.useState(initialUrl);
  const [hasError, setHasError] = React.useState(false);

  const handleError = React.useCallback(() => {
    console.error("Image failed to load:", currentUrl);
    if (!hasError && currentUrl !== fallbackUrl) {
      setCurrentUrl(fallbackUrl);
      setHasError(true);
    }
  }, [currentUrl, fallbackUrl, hasError]);

  return {
    currentUrl,
    handleError,
    hasError,
  };
}
