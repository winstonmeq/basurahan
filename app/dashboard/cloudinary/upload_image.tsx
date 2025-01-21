'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function UploadPage({ userId }: { userId: string }) {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setUploadStatus(null);
      setUploadedImageURL(null); // Reset URL when new file is selected
    }
  };

  const router = useRouter();

  const handleUpload = async () => {
    if (!selectedImage) {
      setUploadStatus('Please select an image.');
      return;
    }

    if (!title || !location || !remarks) {
      setUploadStatus('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('title', title);
    formData.append('location', location);
    formData.append('remarks', remarks);
    formData.append('userId', userId);

    try {
      setUploadStatus('Uploading...');

      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus('Image uploaded successfully!');
        setUploadedImageURL(data.secure_url);

        console.log(data)

      } else {
        const errorData = await response.json();
        setUploadStatus(`Upload failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      setUploadStatus('Upload failed');
    } finally {
      // router.back()
    }
  };

  return (
    <div className='w-full md:w-1/2 pr-4'>
      <Card>
        <CardHeader>
         <div className='flex justify-end'>
         <button
              onClick={() => router.back()}
              className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              X
            </button>
         </div>
      
        </CardHeader>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-8">Image Upload</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <Textarea
            placeholder="Write your paragraph here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 rounded-lg mb-4 px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4} // Adjust number of rows as needed
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="mb-4"
          />
         
          {uploadStatus && (
            <p className="mt-4 font-semibold text-center">{uploadStatus}</p>
          )}
          {uploadedImageURL && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Uploaded Image:</h2>
              <Image
                src={uploadedImageURL}
                alt="Uploaded"
                layout="responsive"
                width={300}
                height={300}
                className="max-w-xs max-h-48"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
        
            <button
              onClick={handleUpload}
              className="bg-black w-full  hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              // disabled={!selectedImage || !title || !location || !remarks}
            >
              Upload
            </button>

           
          
        </CardFooter>
      </Card>
    </div>
  );
}
