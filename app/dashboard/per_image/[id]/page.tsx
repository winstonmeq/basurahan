"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ImageData {
  id: number; // Adjust type based on your API
  title: string;
  location: string;
  filename: string;
  remarks: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function DetailPage() {
  const router = useRouter();

  const params = useParams(); // Extract dynamic route parameters
  const { id } = params; // Access the `id`

  const [image, setImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("this is the", id);

  useEffect(() => {
    const fetchImage = async () => {
      if (!id) return; // No `id` means no API call

      setLoading(true);

      try {
        const response = await fetch(`/api/image/${id}`); // Fetch image by `id`

        if (response.ok) {
          const responseData = await response.json();
          setImage(responseData.image_data); // Assuming the API returns a single image object
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
    <div className="flex w-full bg-black">
      <div className="relative w-3/4">
        <div className="absolute top-0 left-0 w-full flex flex-col justify-between p-4">
          <div className="flex items-center justify-between  text-white">
            <div className="flex items-center space-x-2">
             
              <Button onClick={() => router.back()}
              className=" text-white rounded-full bg-gray-400">
              X
            </Button>
             
              <span>{image.user.name}</span>
            </div>
            <span className="text-sm">
    {new Date(image.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>
          </div>

          <div className="flex flex-col items-start text-start pt-10 text-white">
              <p className="text-xl font-normal">{image.title}</p>
              <p className="mt-6 font-sans font-extralight">Address: {image.location}</p>
            </div>

          <div className="flex flex-col items-center text-white">
           
            <div className="pt-8 flex flex-col ">
              <Image
                src={image.filename}
                alt={image.title}
                width={800}
                height={400}
                className="rounded-md opacity-80 cover"
              />
            </div>
            <div className="flex flex-col items-start text-start text-white">
              <p className="mt-2 font-sans font-extralight">Remark: {image.remarks}</p>
       </div>
          </div>        
        </div>
      </div>
      

    <div className="w-1/4 bg-gray-800 text-white p-4 hidden sm:block md:block">
  {/* Story details header */}
  <div className="text-lg font-semibold mb-4">Post details</div>

  <div>
    <div className="text-sm mb-2">30 viewers</div>

    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full text-center bg-gray-600">a</div>
      <span>Administrator</span>
    </div>

    <div className="text-xs text-gray-400 mt-4">
      After 14 days, you can’t see who viewed a post unless they
      interacted with it
    </div>
  </div>
</div>

    </div>
  );
}
