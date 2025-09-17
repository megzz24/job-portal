import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  // State to handle the mounting/unmounting for animations
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      // Delay unmounting for the fade-out animation
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    // Overlay with backdrop blur and smooth transition
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out
                  ${isOpen ? 'opacity-100' : 'opacity-0'} bg-black/60 backdrop-blur-sm`}
      onClick={onClose}
    >
      {/* Modal panel with a scale-in animation */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4 transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content is passed here */}
        {children}
        
        {/* A stylish close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;