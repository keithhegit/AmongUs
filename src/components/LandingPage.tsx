import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Diagonal lines */}
      <div className="absolute w-full h-64 top-[239px] bg-[#D9D9D9]" />
      <div className="absolute w-[467.62px] h-[1px] left-0 top-[237px] bg-black rotate-[33.49deg]" />
      <div className="absolute w-[463.79px] h-[1px] left-0 top-[490px] bg-black rotate-[-32.76deg]" />

      {/* Buttons */}
      <div className="absolute w-[279px] left-[56px] space-y-12">
        <button
          onClick={() => navigate('/login')}
          className="w-full h-[51px] bg-[#8E8E8E] text-white font-bold text-2xl rounded-lg"
        >
          Login
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="w-full h-[51px] bg-[#8E8E8E] text-white font-bold text-2xl rounded-lg"
        >
          SignUp
        </button>
      </div>
    </div>
  );
}