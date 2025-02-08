

'use client'
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  onImageClick: (id:number) => void;
}

interface ImageData {
    id: number;
    title: string;
    latitude: string;
    filename: string;
    longitude: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

const ImageGallery: React.FC<ImageGalleryProps> = ({ onImageClick }) => {

    const [images, setImages] = useState<ImageData[]>([]);

  const fetchImages = useCallback(async () => {

  
      try {
        const response = await fetch(`/api/image`);
  
        if (response.ok) {
          const responseData = await response.json();
          setImages(responseData.image_data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    }, []);
  
    useEffect(() => {
      fetchImages();
    }, [fetchImages]);

  return (
    <div className="flex overflow-x-auto space-x-4 p-4 h-1/4">
    {images.map((items) => (
      <div
        key={items.id}
        className="w-[100px] h-[100px]" // Added fixed width and height for container
        onClick={() => onImageClick(items.id)}
      >
        <Image
          src={items.filename}
          alt={items.title}
          width={100}
          height={100}
          className="object-cover w-full h-full hover:scale-100 transition-transform duration-200" // object-cover ensures the image fills the container while maintaining aspect ratio
        />
        <div className="flex overflow-hidden mt-2"> {/* Added mt-1 for spacing */}
          <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">{items.title}</h2> {/* Added styling for overflow handling */}
        </div>
      </div>
    ))}
  </div>
  );
};

export default ImageGallery;