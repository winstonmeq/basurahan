import { useEffect, useState, useCallback } from "react";

interface Comment {
  id: string;
  comment: string;
  user: {
    id: string;
    name: string;
  };
}

export default function CommentBoxTable({ userId, imageId }: { userId: string; imageId: string }) {
  const [comment_data, setCommentData] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);



  
  const fetchComment = useCallback(async () => {

    setLoading(true);

    try {
      const response = await fetch(`/api/comment/${imageId}`);

      if (response.ok) {
        const responseData = await response.json();
        setCommentData(responseData.comment_data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [imageId]); // Add imageId as a dependency

  useEffect(() => {
    fetchComment();
  }, [fetchComment]); // Pass fetchComment directly to the dependency array

  const handleComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!comment || !imageId || !userId) {
      setUploadStatus('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('imageId', imageId);
    formData.append('userId', userId);

    try {
      setUploadStatus('Uploading...');

      const response = await fetch('/api/comment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Comment uploaded successfully!');
        fetchComment();
      } else {
        const errorData = await response.json();
        setUploadStatus(`Upload failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during comment upload:', error);
      setUploadStatus('Upload failed');
    } finally {
      setUploadStatus("");
      setComment("");
    }
  };

  if (loading) {
    return (
      <div>
        loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-2">
      <div className="w-full bg-white border rounded-lg shadow-md p-1">
        {/* Top bar with buttons */}
        <div className="flex items-center justify-between">
          <button className="text-gray-500 hover:text-blue-500">Tinuod</button>
          <button className="text-gray-500 hover:text-blue-500">Comment</button>
          <button className="text-gray-500 hover:text-blue-500">Share</button>
        </div>

        {/* Input area */}
        <div className="border-t pt-2">
          <div className="flex flex-col gap-2 border-b pb-2">
            {comment_data.map((items) => (
              <ul key={items.id}>
                <li className="pl-8 flex w-full flex-row">
                  <span className="p-1">{items.user.name}:</span>
                  <span className="pl-2 pb-1 pt-1 overflow-hidden pr-2 rounded bg-slate-100">{items.comment}</span>
                </li>
              </ul>
            ))}
          </div>

          <div className="flex items-start space-x-2 pt-3">
            {/* Profile image placeholder */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            {/* Input field */}
            <div className="flex-1">
              <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Comment as"
                className="w-full px-2 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button onClick={handleComment} className="rounded p-2 text-white justify-center bg-black">OK</button>
          </div>
          {uploadStatus && <div>{uploadStatus}</div>}

          {/* Emoji and attachments row */}
          <div className="mt-1 flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-500">😊</button>
            <button className="text-gray-500 hover:text-blue-500">📸</button>
            <button className="text-gray-500 hover:text-blue-500">GIF</button>
            <button className="text-gray-500 hover:text-blue-500">🎲</button>
          </div>
        </div>
      </div>
    </div>
  );
}