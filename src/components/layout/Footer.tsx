import React from 'react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full font-bold">
            😊 好人
          </button>
          <button className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full font-bold">
            👿 坏人
          </button>
        </div>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
          🔒 关卡 7
        </button>
      </div>
    </footer>
  );
}