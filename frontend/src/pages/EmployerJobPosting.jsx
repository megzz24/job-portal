import React, { useState } from 'react';
import Modal from '../components/Modal'; 
import JobPostForm from '../components/JobPostForm';

const EmployerJobPosting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // A beautiful, subtle gradient background
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-100 p-4">
      
      {/* "Glassmorphism" card for the main content */}
      <div className="w-full max-w-lg text-center p-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/50">
        
        {/* A vibrant gradient heading */}
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          Your Next Hire Awaits
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Effortlessly post job openings and connect with top-tier talent.
        </p>

        {/* An enhanced, eye-catching button with a subtle pulse animation */}
        <button
          onClick={openModal}
          className="group flex items-center justify-center gap-3 w-full sm:w-auto mx-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
        >
          <span className="material-symbols-outlined transition-transform duration-300 group-hover:rotate-180">
            <img src='..\src\assets\load.png' className="w-6 h-6" alt="loading"/>
          </span>
          Post a New Job
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <JobPostForm />
      </Modal>
    </div>
  );
};

export default EmployerJobPosting;