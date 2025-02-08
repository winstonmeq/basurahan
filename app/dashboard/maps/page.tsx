// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import GoogleMap from './googlemap';
import ImageGallery from './images';

export default function Home() {
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const handleImageClick = (id: number) => {
    setSelectedImageId(id);
  };

    const handleMarkerClick = (id: number) => {
        setSelectedImageId(id);
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Map with Image Gallery</h1>
      <GoogleMap selectedImageId={selectedImageId} onMarkerClick={handleMarkerClick} />
      <ImageGallery onImageClick={handleImageClick} />
    </div>
  );
}