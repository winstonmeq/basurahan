import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const PostBox: React.FC = () => {
  const router = useRouter();

  const openCameraInSamePage = () => {
    router.push('/dashboard/camera');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mx-auto">
      {/* Top Section: Profile Icon and Input */}
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <Image
            src="/profile.png"
            alt="Profile"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Input Placeholder */}
        <button className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-600 focus:outline-none">
          <Link href="/dashboard/maps">
            <p className="text-left">Post Photo and Maps</p>
          </Link>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Bottom Section: Buttons */}
      <div className="flex justify-between items-center">
        {/* Open Camera in Same Window */}
        <button
          onClick={openCameraInSamePage}
          className="flex items-center space-x-2 text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
        >
          <i className="fas fa-camera"></i>
          <span className="text-sm font-medium">Take Photo</span>
        </button>

        {/* Reports Button */}
        <button className="flex items-center space-x-2 text-yellow-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
          <i className="fas fa-smile"></i>
          <Link href={"/dashboard/cloudinary"}><span className="text-sm font-medium">Upload</span></Link>
        </button>
      </div>
    </div>
  );
};

export default PostBox;