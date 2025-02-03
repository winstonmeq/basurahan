
'use client'
import { useRef, useState, useEffect } from "react";

const CameraPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 300, 300);
        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageData);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Camera</h1>

      {/* Video Stream */}
      <video ref={videoRef} className="w-full max-w-sm border rounded-lg shadow-lg" autoPlay playsInline />

      {/* Capture Button */}
      <button
        onClick={capturePhoto}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        Capture Photo
      </button>

      {/* Canvas (Hidden for Capturing) */}
      <canvas ref={canvasRef} className="hidden" width={300} height={300} />

      {/* Show Captured Image */}
      {capturedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Captured Image:</h3>
          <img src={capturedImage} alt="Captured" className="w-full max-w-sm rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
};

export default CameraPage;
