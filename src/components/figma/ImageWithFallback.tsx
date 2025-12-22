import React, { useState, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

/**
 * Gets possible image paths for a given path, trying multiple formats
 * Returns array of paths to try in order: .png, .jpeg, .jpg, original
 */
function getImagePaths(src: string): string[] {
  if (!src) return [src]

  // Extract base path (remove common image extensions)
  const basePath = src.replace(/\.(png|jpeg|jpg|gif|webp|svg)$/i, '')
  
  // If basePath is same as src, it means no extension was found
  // Try all formats
  if (basePath === src) {
    return [
      `${src}.png`,
      `${src}.jpeg`,
      `${src}.jpg`,
      src, // fallback to original
    ]
  }

  // If src had an extension, try that format first, then alternatives
  const originalExt = src.match(/\.(png|jpeg|jpg)$/i)?.[1]?.toLowerCase()
  
  if (originalExt === 'png') {
    return [
      `${basePath}.png`, // original
      `${basePath}.jpeg`,
      `${basePath}.jpg`,
    ]
  } else if (originalExt === 'jpeg' || originalExt === 'jpg') {
    return [
      `${basePath}.png`, // try PNG first (for Nano Banana processed images)
      `${basePath}.jpeg`,
      `${basePath}.jpg`,
      src, // original
    ]
  }

  // For other formats (gif, webp, svg), return as-is
  return [src]
}

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0)
  const [didError, setDidError] = useState(false)

  const { src, alt, style, className, ...rest } = props

  // Get all possible image paths
  const imagePaths = getImagePaths(src || '')

  const handleError = () => {
    // Try next format if available
    if (currentSrcIndex < imagePaths.length - 1) {
      setCurrentSrcIndex(currentSrcIndex + 1)
    } else {
      // All formats failed
      setDidError(true)
    }
  }

  // Reset when src changes
  useEffect(() => {
    setCurrentSrcIndex(0)
    setDidError(false)
  }, [src])

  const currentSrc = imagePaths[currentSrcIndex] || src

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
      key={currentSrcIndex}
    />
  )
}
