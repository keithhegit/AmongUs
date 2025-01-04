import React from "react";
import { useNavigate } from "react-router-dom";

export function ScreenOne() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* 标题 */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Hello World!
        </h1>
        
        {/* 按钮组 */}
        <div className="space-y-4">
          <button
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-lg transition-colors"
            onClick={() => alert("Clicked!")}
          >
            Tap me for an alert
          </button>
          
          <button
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-lg transition-colors"
            onClick={() => navigate("/two", { state: { message: "Hello, world!" } })}
          >
            Go to next screen
          </button>
        </div>
      </div>
    </div>
  );
}
