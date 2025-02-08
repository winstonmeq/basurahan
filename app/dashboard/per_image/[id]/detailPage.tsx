"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentBoxTable from "../../commentBox";
import GoogleMap from './googlemap';

interface ImageData {
  id: number;
  title: string;
  latitude: string;
  filename: string;
  longitude: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function DetailPage({userId}:{userId:string}) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [image, setImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/image/${id}`);
        if (response.ok) {
          const responseData = await response.json();
          setImage(responseData.image_data);
        } else {
          console.error("Failed to fetch image data");
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!image) {
    return <p>No image found for the provided ID.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full ">
      <div className="py-3 w-full"> {/* Removed sm:max-w-5xl sm:mx-auto */}
        <div className="relative bg-white shadow-lg rounded-3xl flex flex-col md:flex-row">
          {/* Image Section (Left Column) */}
          <div className="xl:w-1/2 p-6">
            <div className="mb-4">
              <Button onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back
              </Button>
            </div>

            <div className="relative">
              <Image
                src={image.filename}
                alt={image.title}
                width={400} // Adjusted for responsiveness
                height={600} // Adjusted for responsiveness
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                className="rounded-2xl object-cover"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">{image.title}</h2>
              <p className="text-gray-600">
                Uploaded by: {image.user.name} on{' '}
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>
                  {/* Comment Box */}
                  <div className="mt-4">
                <CommentBoxTable userId={userId} imageId={image.id.toString()} url={image.filename} />
              </div>
          </div>

          {/* Map Section (Right Column) */}
          <div className="md:w-1/2 p-6 border-l border-gray-200">
            <div className="text-lg font-semibold mb-4 text-gray-800">Location Map</div>
            <div className=""> {/* Set a fixed height or adjust as needed */}
              <GoogleMap latitude={parseFloat(image.latitude)} longitude={parseFloat(image.longitude)} />
            </div>

        
          </div>
        </div>
      </div>
    </div>
  );
}