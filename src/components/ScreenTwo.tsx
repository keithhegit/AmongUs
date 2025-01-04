import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function ScreenTwo() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "No message";

  return (
    <div className="min-h-screen bg-yellow-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          You're viewing screen two!
        </h2>
        
        <p className="text-xl text-center mb-8">
          Message: {message}
        </p>
        
        <button
          className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-lg transition-colors"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
}
