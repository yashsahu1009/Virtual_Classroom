import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function SignUpModal({ openModal, setOpenModal, handleSignInClick }) {
  // State to manage the checkbox values
  const [isFaculty, setIsFaculty] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  // Render nothing if the modal is not open
  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
      {/* Modal Card */}
      <div className="relative w-full max-w-sm h-[500px] bg-black p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => setOpenModal(false)} // Close modal when cross is clicked
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          SIGN UP TO ThinkEdge
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white mb-1" htmlFor="name">
              What&apos;s your name?
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#262626] text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-1" htmlFor="email">
              What&apos;s your e-mail?
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#262626] text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-1" htmlFor="password">
              Your password?
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your Password"
              className="w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#262626] text-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#262626] text-white"
            />
          </div>

          {/* Faculty/Student Checkbox */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                id="faculty"
                type="checkbox"
                checked={isFaculty}
                onChange={() => setIsFaculty(!isFaculty)}
                className="mr-2"
              />
              <label htmlFor="faculty" className="text-white">Faculty</label>
            </div>
            <div className="flex items-center">
              <input
                id="student"
                type="checkbox"
                checked={isStudent}
                onChange={() => setIsStudent(!isStudent)}
                className="mr-2"
              />
              <label htmlFor="student" className="text-white">Student</label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#6674CC] text-white rounded hover:bg-[#5c63a2] transition-colors"
          >
            Start your learning journey
          </button>
        </form>

        {/* Links */}
        <div className="flex items-center justify-between mt-4 text-sm">
          {/* Using Link for sign-in navigation */}
          <Link
            to="/logout" // Use the appropriate route here
            className="text-[#6674CC] hover:underline"
          >
            Sign in with your account
          </Link>
          <button type="button" to="/forgot-password"className="text-[#6674CC] hover:underline">
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
