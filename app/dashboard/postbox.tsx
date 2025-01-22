import Link from "next/link";
import Image from "next/image";


const PostBox = () => {
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
          <button className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-600 focus:outline-none ">
          <Link href={"/dashboard/cloudinary"}>         
          <p className="text-left">What on your mind? </p>          
          </Link>
          </button>
           
        
        </div>
  
        {/* Divider */}
        <div className="border-t my-4"></div>
  
        {/* Bottom Section: Buttons */}
        <div className="flex justify-between items-center">
          {/* Live Video Button */}
          <button className="flex items-center space-x-2 text-red-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <i className="fas fa-video"></i>
            <span className="text-sm font-medium">
            <Link href="/dashboard/cloudinary">Tagged</Link>
            </span>
          </button>
  
          {/* Photo/Video Button */}
          <button className="flex items-center space-x-2 text-green-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <i className="fas fa-photo-video"></i>
            <span className="text-sm font-medium">Photo/Upload</span>
          </button>
  
          {/* Feeling/Activity Button */}
          <button className="flex items-center space-x-2 text-yellow-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <i className="fas fa-smile"></i>
            <span className="text-sm font-medium">Feeling/Activity</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default PostBox;
  