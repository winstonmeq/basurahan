import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { Image } from "@prisma/client";



interface ImageData {
  image_data: Image[];
  totalRecords: number;
}


export default function ImagesTable() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/image?page=${page}&limit=10`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ImageData = await response.json();

        if (data && data.image_data) {
          setImages(data.image_data);
          setTotalRecords(data.totalRecords);
        } else {
          throw new Error("Invalid data format received from the API");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch users")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span>Loading images...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-4">
        <span className="text-red-500">Error: {error.message}</span>
      </div>
    );
  }

  const deleteImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/image/${imageId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Image deleted successfully");

        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );

        const fetchImagesAfterDelete = async () => {
          setIsLoading(true);

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
            setIsLoading(false);
          }
        };

        fetchImagesAfterDelete();
      }
    } catch (error) {
      console.error(
        "Error deleting image:",
        error || "An unexpected error occurred"
      );
    }
  };


  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
          
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
             <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((items) => (
            <TableRow key={items.id}>
            
              <TableCell>
                 <div  className="w-[100px] h-[100px]">
                        <img
                          src={items.filename}
                          alt={items.title}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full hover:scale-100 transition-transform duration-200" // object-cover ensures the image fills the container while maintaining aspect ratio
                        />
                    
                      </div>
                      
              </TableCell>
              <TableCell>  <div className="max-w-[400px] min-w-[200px] overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                {items.title}
              </div></TableCell>
              <TableCell>{items.latitude}</TableCell>
              <TableCell>{items.longitude}</TableCell>             
             
              <TableCell>{new Date(items.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{
                
                <div className="flex justify-end">
              
                  <button 
                    onClick={() => deleteImage(items.id)}
                    className="text-red-500 hover:text-red-700 font-semibold py-2 px-4 rounded bg-gray-200"
                  >
                    Delete
                  </button>
               
              </div>
                
                }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil(totalRecords / 10)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={images.length < 10}
        >
          Next
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Total Posts: {totalRecords}</p>
    </div>
  );
}