import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const { courseName } = useParams(); // Get the course name from the URL parameter
  const navigate = useNavigate();

  // Set course-specific content based on the courseName
  const renderCourseContent = () => {
    switch (courseName) {
      case 'java':
        return (
          <div className="container mx-auto px-4 mt-12 pt-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl font-bold leading-tight">
                  <span className="text-blue-500">Java - Alpha Plus 4.0</span> Complete Data Structures & Algorithms!
                </h1>
                <ul className="mt-6 space-y-2 text-lg text-gray-700">
                  <li><i className="bi bi-camera-video"></i> DSA & Advanced DSA Concepts (Java)</li>
                  <li><i className="bi bi-people"></i> Individual Doubt Solving TAs & Community</li>
                  <li><i className="bi bi-journal"></i> 50 Live Practice Sessions with Top Mentors</li>
                </ul>
                <button 
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600"  
                  onClick={() => navigate("/payment")}
                >
                  Enroll Now ➤
                </button>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <img src="/path-to-your-image.jpg" alt="Profile" className="w-full h-auto" />
              </div>
            </div>
          </div>
        );
      case 'webdevelopment':
        return (
          <div className="container mx-auto px-4 mt-12 pt-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl font-bold leading-tight">
                  <span className="text-blue-500">Web Development - Alpha Plus 4.0</span> Complete Web Development Course!
                </h1>
                <ul className="mt-6 space-y-2 text-lg text-gray-700">
                  <li><i className="bi bi-camera-video"></i> Frontend & Backend Concepts</li>
                  <li><i className="bi bi-people"></i>  Individual Doubt Solving TAs & Community</li>
                  <li><i className="bi bi-journal"></i> 50 Live Practice Sessions with Top Mentors</li>
                </ul>
                <button 
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600"  
                  onClick={() => navigate("/payment")}
                >
                  Enroll Now ➤
                </button>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <img src="/path-to-your-image.jpg" alt="Profile" className="w-full h-auto" />
              </div>
            </div>
          </div>
        );
      default:
        return <div>Course Not Found</div>;
    }
  };

  return (
    <div>
      {renderCourseContent()}
    </div>
  );
};

export default CoursePage;
