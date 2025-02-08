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
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [cameraActive, setCameraActive] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null); // State to hold the stream

    const router = useRouter();

    const MAX_IMAGE_SIZE_KB = 200; // Set your desired maximum file size in KB
    const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_KB * 1024;

    const CAPTURE_IMAGE_WIDTH = 300; // Set the desired width
    const CAPTURE_IMAGE_HEIGHT = 200; // Set the desired height

    useEffect(() => {
        let currentStream: MediaStream | null = null; // store the stream within the effect

        const startCamera = async () => {
            try {
                // Check if navigator.mediaDevices and getUserMedia are available
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    setUploadStatus("Camera access is not supported in this browser.");
                    return;
                }

                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });

                currentStream = newStream;  // Assign the stream to the local variable

                if (videoRef.current) {
                  videoRef.current.srcObject = newStream;
                  videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current?.play().catch(error => {
                      console.error("Playback failed:", error);
                    });
                  });
                  setStream(newStream);  // Update the stream state
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
                setUploadStatus(`Error accessing camera: ${error}`);
            }
        };

        if (cameraActive) {
            startCamera();
        }


        return () => {
            if (currentStream) { // Use the stream stored in the local variable
              currentStream.getTracks().forEach(track => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null; // important to clear the srcObject
            }
            setStream(null); // Clear the stream state.

        };
    }, [cameraActive]);

    // Helper function to convert data URL to File object
    const dataURLtoFile = async (dataurl: string, filename: string): Promise<File> => {
        const res = await fetch(dataurl);
        const blob = await res.blob();
        return new File([blob], filename, { type: 'image/png' });
    }

    const capturePhoto = () => {
      if (videoRef.current && canvasRef.current && stream) {
          //Set Canvas Dimension
          canvasRef.current.width = CAPTURE_IMAGE_WIDTH;
          canvasRef.current.height = CAPTURE_IMAGE_HEIGHT;

          const context = canvasRef.current.getContext("2d");
          if (context) {
              context.drawImage(videoRef.current, 0, 0, CAPTURE_IMAGE_WIDTH, CAPTURE_IMAGE_HEIGHT);  // Draw with specified dimensions
              const imageData = canvasRef.current.toDataURL("image/jpeg", 0.7); // Reduce quality for smaller size

              dataURLtoFile(imageData, 'captured_image.jpeg')
                  .then(async (file) => {
                      if (file.size > MAX_IMAGE_SIZE_BYTES) {
                          setUploadStatus(`Image size exceeds the limit of ${MAX_IMAGE_SIZE_KB} KB.  Please retake.`);
                          setCapturedImage(null); // Clear the captured image
                          return;
                      }

                      setCapturedImage(imageData); // Store the potentially compressed image data
                      setSelectedImage(null);
                      setUploadedImageURL(null);
                      setCameraActive(false);

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
                  });
          }
      }
  };


    const retakePhoto = () => {
        setCapturedImage(null);
        setCameraActive(true);
        setLatitude(null);
        setLongitude(null);
    };

    const handleUpload = async () => {
        let imageToUpload: File | null = null;

        if (capturedImage) {
            imageToUpload = await dataURLtoFile(capturedImage, 'captured_image.png');
        } else if (selectedImage) {
            imageToUpload = selectedImage;
        }

        if (!imageToUpload) {
            setUploadStatus('Please select or capture an image.');
            return;
        }

        if (!title || latitude === null || longitude === null) {  // Check for null
            setUploadStatus('Please fill out all fields.');
            return;
        }

        // Check file size again just before upload
        if (imageToUpload.size > MAX_IMAGE_SIZE_BYTES) {
            setUploadStatus(`Image size exceeds the limit of ${MAX_IMAGE_SIZE_KB} KB.`);
            return;
        }


        const formData = new FormData();
        formData.append('image', imageToUpload);
        formData.append('title', title);
        formData.append('userId', userId);
        formData.append('latitude', latitude.toString());
        formData.append('longitude', longitude.toString());

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
            router.push('/dashboard');
        }
    };

    const handleLatitudeChange = () => {
       // Handle the change even if read-only to prevent errors
       // You can add a check here if you want to allow manual entry in some cases
    };

    const handleLongitudeChange = () => {
       // Handle the change even if read-only to prevent errors
       // You can add a check here if you want to allow manual entry in some cases
    };

    return (
        <div className='w-full md:w-1/2 pr-4'>
            <div className='flex flex-col text-center justify-center'>
                <h1 className="text-2xl font-bold mb-4">Camera</h1>
                {cameraActive && (
                    <video ref={videoRef} className="w-full border rounded-lg shadow-lg" autoPlay playsInline muted />
                )}
                <canvas ref={canvasRef} width={CAPTURE_IMAGE_WIDTH} height={CAPTURE_IMAGE_HEIGHT} style={{ display: 'none' }} />
                {cameraActive && (
                    <button
                        onClick={capturePhoto}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Capture Photo
                    </button>
                )}
                {capturedImage && (
                    <button
                        onClick={retakePhoto}
                        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                    >
                        Retake Photo
                    </button>
                )}
            </div>

            <Card>
                <CardContent className="p-6">
                    {capturedImage && (
                        <div className="mt-4 mb-4 flex flex-col items-center justify-center">
                            <h2 className="font-semibold mb-2">Captured Image:</h2>
                            <Image
                                src={capturedImage}
                                alt="Captured"
                                width={CAPTURE_IMAGE_WIDTH} // Use the capture width
                                height={CAPTURE_IMAGE_HEIGHT} // Use the capture height
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
                        rows={4}
                    />
                    <Input
                        type="text"
                        placeholder="Latitude"
                        value={latitude?.toString() || ''}
                        onChange={handleLatitudeChange}  // Handle change even if read-only
                        readOnly
                        className="mb-4"
                    />
                    <Input
                        type="text"
                        placeholder="Longitude"
                        value={longitude?.toString() || ''}
                        onChange={handleLongitudeChange}  // Handle change even if read-only
                        readOnly
                        className="mb-4"
                    />

                    {uploadStatus && (
                        <p className="mt-4 font-semibold text-center">{uploadStatus}</p>
                    )}
                    {uploadedImageURL && (
                        <div className="mt-4 flex flex-col w-full justify-center items-center">
                            {/* <Image
                                src={uploadedImageURL}
                                alt="Uploaded"
                                width={CAPTURE_IMAGE_WIDTH}
                                height={CAPTURE_IMAGE_HEIGHT}
                                className="max-w-xs max-h-48"
                                style={{ objectFit: 'cover' }}
                            /> */}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <button
                        onClick={handleUpload}
                        className="bg-black w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        disabled={!title || latitude === null || longitude === null} // Ensure location is available
                    >
                        Upload
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}