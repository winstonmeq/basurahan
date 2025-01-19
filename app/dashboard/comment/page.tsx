


export default function CommentBox() {
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
          <div className="flex items-start space-x-2">
            {/* Profile image placeholder */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            {/* Input field */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Comment as"
                className="w-full px-2 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button className="rounded p-2 text-white justify-center bg-black">ok</button>
          </div>

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
