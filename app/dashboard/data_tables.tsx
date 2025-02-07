"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import PostBox from "./postbox";
import Link from "next/link";
import CommentBoxTable from "./commentBox";

interface ImageData {
  id: string; // Adjust type based on your API
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

const Datatables = ({userId}:{userId:string}) => {

  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/image`);

        if (response.ok) {
          const responseData = await response.json();
          setImages(responseData.image_data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []); // Add empty dependency array to prevent repeated calls

  return (
    <div className="flex justify-center items-start w-full bg-gray-100">
      {loading ? (
        <p>Loading images...</p> // Show a loading message while fetching data
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
          <div className="flex flex-col gap-4 p-4 ">
            <div>
              <PostBox />
            </div>
            {images.map((item) => (
              <div key={item.id}>
                <Card  className="w-full">
                   <CardHeader>
                    <CardTitle>
                      <div className="flex items-center bg-white ">
                        {/* Profile Image */}
                        <div className="w-12 h-12 bg-gray-300 flex-shrink-0 rounded-full flex items-center justify-center">
                          <span className="text-2xl text-gray-500 font-bold">
                            P
                          </span>
                        </div>

                        {/* Text Content */}
                        <div className="ml-4">
                          {/* Name */}
                          <h2 className="text-lg font-semibold text-gray-800">
                            {item.user.name}
                          </h2>

                          {/* Email */}
                          <p className="text-gray-600 text-sm">
                            {item.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="pt-8">
                        <p className="font-light text-md">{item.title}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/dashboard/per_image/${item.id}`}>
                      <Image
                        src={item.filename} // Fix template string usage
                        alt={item.title}
                        width={800}
                        height={400}
                        priority />
                    </Link>
                  </CardContent>
                  <CardFooter className="bg-gray-300 p-3">                    
                      <div>
                        <Link href={`/dashboard/per_image?id=${item.id}`}>
                          Location: {item.latitude}, {item.longitude}
                        </Link>
                      </div>

                
                  </CardFooter>
                </Card>
              <div>
                  <CommentBoxTable userId={userId} imageId={item.id}  />
                </div></div>
            ))}
            
          </div>

          <div className="sticky top-0 p-6 h-screen hidden md:block">
            <div className="flex flex-col justify-between w-full h-1/2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row font-bold">Sponsored </div>

              <div className="flex flex-row font-light pl-4">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="https://img.freepik.com/free-vector/world-photography-day-event_23-2148572842.jpg?t=st=1737297210~exp=1737300810~hmac=43bae5d65a2e827ece54ec73e145025cc9cc77d3d9f09aaa9b344b14b10ac48a&w=1060" 
                    alt="Profile"
                    width={300}
                    height={300} 
                    priority
                    className="w-full h-full object-cover" 
                  />
              </div>
                <div className=" items-center p-6">Lazada Promo </div>
                
                </div>

                <div className="flex flex-row font-light pl-4">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="https://img.freepik.com/free-photo/front-view-young-traveller-with-backpack-holding-up-map-pointing-finger-up_179666-41810.jpg?t=st=1737297342~exp=1737300942~hmac=2180e9299d5eebaa528e27d0640b17e093a4b4f0249b7053689f599e3eb32d8f&w=1800" 
                    alt="Profile" 
                    width={300}
                    height={300} 
                    priority
                    className="w-full h-full object-cover" 
                  />
              </div>
                <div className=" items-center p-6">Tour Package</div>
                
                </div>               

            
            </div>



            <div className="flex flex-col gap-4">
              <div className="flex flex-row font-bold">Contact Us </div>

              <div className="flex flex-row font-light pl-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/profile.png" 
                    alt="Profile" 
                    width={300}
                    height={300} 
                    priority
                    className="w-full h-full object-cover" 
                  />
              </div>
                <div className=" items-center p-2">Menro Office: #09086421546 </div>
                
                </div>

                <div className="flex flex-row font-light pl-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/profile.png" 
                    alt="Profile" 
                    width={300}
                    height={300} 
                    className="w-full h-full object-cover" 
                  />
              </div>
                <div className=" items-center p-2">Principal Office: #09086421546 </div>
                
                </div>               

            
            </div>




            </div>
          
          </div>

         
        </div>
      )}
    </div>
  );
};

export default Datatables;
