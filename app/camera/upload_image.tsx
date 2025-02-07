'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function UploadPage({ userId }: { userId: string }) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // Store the captured image data URL
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const router = useRouter();


    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

        startCamera();

        return () => {
            const currentVideoRef = videoRef.current;  // Capture the current value
        
            if (currentVideoRef && currentVideoRef.srcObject) {
                (currentVideoRef.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
            }
        };

        
    }, []);


  



      // Helper function to convert data URL to File object
  const dataURLtoFile = async (dataurl: string, filename: string): Promise<File> => {
    const res = await fetch(dataurl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/png' });
}


const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
            context.drawImage(videoRef.current, 0, 0, 300, 300);
            const imageData = canvasRef.current.toDataURL("image/png");
            setCapturedImage(imageData);
            setSelectedImage(null); // Clear selected image if any
            setUploadedImageURL(null); // Clear uploaded image url

            // Get geolocation when capturing the photo
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        console.log("Latitude: ", position.coords.latitude);
                        console.log("Longitude: ", position.coords.longitude);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        setUploadStatus("Error getting location.  Please ensure location services are enabled.");
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                setUploadStatus("Geolocation is not supported by this browser.");
            }
        }
    }
};


    const handleUpload = async () => {

        let imageToUpload: File | null = null;

        if (capturedImage) {
            // If there's a captured image, convert it to a File object
            imageToUpload = await dataURLtoFile(capturedImage, 'captured_image.png');
        } else if (selectedImage) {
            // If a file was selected, use that
            imageToUpload = selectedImage;
        }

        if (!imageToUpload) {
            setUploadStatus('Please select or capture an image.');
            return;
        }

        if (!title || !latitude || !longitude) {
            setUploadStatus('Please fill out all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageToUpload);
        formData.append('title', title);
        formData.append('userId', userId);

        // Append latitude and longitude if available
        if (latitude !== null && longitude !== null) {
            formData.append('latitude', latitude.toString());
            formData.append('longitude', longitude.toString());
        }


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
            router.back()
        }
    };

  

    return (
        <div className='w-full md:w-1/2 pr-4'>

            <div className='flex flex-col text-center justify-center'>

                <h1 className="text-2xl font-bold mb-4">Camera</h1>

                {/* Video Stream */}
                <video ref={videoRef} className="w-full max-w-md border rounded-lg shadow-lg" autoPlay playsInline />
                {/* Canvas for capturing photo (hidden) */}
                <canvas ref={canvasRef} width={300} height={300} style={{ display: 'none' }} />


                {/* Capture Button */}
                <button
                    onClick={capturePhoto}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    Capture Photo
                </button>


            </div>


            <Card>
                <CardContent className="p-6">

                    {capturedImage && (
                        <div className="mt-4 mb-4 flex flex-col items-center justify-center">
                            <h2 className="font-semibold mb-2">Captured Image:</h2>
                            <Image
                                src={capturedImage}
                                alt="Captured"
                                width={300}
                                height={300}
                                className="max-w-xs max-h-48"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}
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
                        defaultValue={latitude?.toString()}
                        className="mb-4"
                    />
                    <Input
                        type="text"
                        placeholder="Remarks"
                        defaultValue={longitude?.toString()}
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
                                width={300}
                                height={300}
                                className="max-w-xs max-h-48"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    {/* {latitude !== null && longitude !== null && (
                        <div className="mt-4">
                            <p>Latitude: {latitude}</p>
                            <p>Longitude: {longitude}</p>
                        </div>
                    )} */}
                </CardContent>
                <CardFooter>

                    <button
                        onClick={handleUpload}
                        className="bg-black w-full  hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        // disabled={!selectedImage && !capturedImage || !title || !location || !remarks}
                    >
                        Upload
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}