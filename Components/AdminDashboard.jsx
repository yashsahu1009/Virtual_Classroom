  import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSun, FaMoon, FaSearch, FaSignOutAlt, FaVideo } from "react-icons/fa";
import logo from "../assets/favicon-3.png";
import courseImage from "../assets/courses.jpg";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([
    { id: 1, title: "Sigma 5.0 - DSA", description: "A complete DSA course", videos: [], videoCount: 0, price: "₹499" },
    { id: 2, title: "Full Stack Web Dev", description: "Master frontend & backend", videos: [], videoCount: 0, price: "₹999" },
  ]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => navigate("/");

  const addCourse = () => {
    if (newCourse.trim() === "" || newPrice.trim() === "" || newDescription.trim() === "") {
      alert("Please enter a valid course name, price, and description.");
      return;
    }
    
    const newCourseObj = {
      id: Date.now(),
      title: newCourse,
      description: newDescription,
      videos: [],
      videoCount: 0,
      price: newPrice,
    };

    setCourses((prevCourses) => [...prevCourses, newCourseObj]);
    setNewCourse("");
    setNewPrice("");
    setNewDescription("");
    setShowCourseModal(false);
  };

  const removeCourse = (id) => setCourses(courses.filter((course) => course.id !== id));

  const editCourse = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    if (!courseToEdit) return;
    const newTitle = prompt("Enter new course title:", courseToEdit.title);
    const newPrice = prompt("Enter new course price:", courseToEdit.price);
    const newDesc = prompt("Enter new course description:", courseToEdit.description);
    if (newTitle && newPrice && newDesc) {
      setCourses(
        courses.map((course) =>
          course.id === id ? { ...course, title: newTitle, price: newPrice, description: newDesc } : course
        )
      );
    }
  };

  const handleVideoUpload = (event, courseId) => {
    const file = event.target.files[0];
    if (!file) return;
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, videos: [...course.videos, file.name], videoCount: course.videoCount + 1 }
          : course
      )
    );
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-all`}>
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="flex items-center">
          <img src={logo} alt="Admin Logo" className="w-12 h-12 rounded-full mr-3" />
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
          <button onClick={handleLogout} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="p-6 flex justify-center">
        <div className="relative w-96">
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Courses</h3>
          <button 
            onClick={() => setShowCourseModal(true)} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add Course
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((course) => (
              <div 
                key={course.id} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg shadow-lg text-white flex flex-col hover:scale-105 transition-transform"
              >
                <img src={courseImage} alt="Course" className="w-full h-32 rounded-lg mb-3" />
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p className="text-sm">{course.videoCount} Videos</p>
                <p className="text-sm italic">{course.description}</p>
                <p className="text-lg font-bold mt-1">{course.price}</p>
                <div className="flex justify-between mt-4">
                  <label className="text-green-200 cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleVideoUpload(e, course.id)} 
                    />
                    <FaVideo />
                  </label>
                  <button onClick={() => editCourse(course.id)} className="text-blue-200">
                    <FaEdit />
                  </button>
                  <button onClick={() => removeCourse(course.id)} className="text-red-200">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {showCourseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Course</h2>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Price (₹)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Course Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            ></textarea>
            <div className="flex justify-between mt-4">
              <button onClick={addCourse} className="bg-green-500 text-white px-4 py-2 rounded">
                Add
              </button>
              <button onClick={() => setShowCourseModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
