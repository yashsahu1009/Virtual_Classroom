import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Fixed navigation
import logo from "../assets/logo1.jpg";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";


const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // Handle logout
  const handleLogout = () => {
    // Clear any necessary data (e.g., localStorage, sessionStorage, or context)
    setIsAuthenticated(false);
    navigate("/");  // Redirect to home after logout
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F9FAFC] shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/sigma-course"
              className="bg-[#6674CC] text-white px-4 py-2 rounded-lg"
            >
              New Sigma 5.0
            </Link>
            <Link to="/dsa-sheet" className="font-semibold">
              DSA Sheet
            </Link>

            {/* Desktop Dropdown for New Courses */}
            <div className="relative">
              <button
                className="font-semibold"
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
              >
                New Courses
              </button>
              {isDesktopDropdownOpen && (
                <div className="absolute bg-white shadow-md mt-2 rounded-md z-50">
                  <Link to="/ " className="block px-4 py-2">
                    Java
                  </Link>
                  <Link to="/sigma-course" className="block px-4 py-2">
                    WebDevelopment
                  </Link>
                </div>
              )}
            </div>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/courses"  // Link to "My Batch" page
                  className="font-semibold text-blue-600"
                >
                  My Batch
                </Link>
                <button
                  className="font-semibold text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="font-semibold text-blue-600"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
                <button
                  className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} className="text-gray-700" />
            ) : (
              <Menu size={28} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-100">
            <Link
              to="/sigma-course"
              className="bg-[#6674CC] text-white px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              New Sigma 5.0
            </Link>
            <Link to="/dsa-sheet" className="font-semibold text-gray-700">
              DSA Sheet
            </Link>

            {/* Mobile Dropdown for New Courses */}
            <div className="relative">
              <button
                className="font-semibold text-gray-700"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                New Courses
              </button>
              {isMobileDropdownOpen && (
                <div className="bg-white shadow-md mt-2 rounded-md w-32 z-50">
                  <Link to="/course-1" className="block px-4 py-2">
                    Course 1
                  </Link>
                  <Link to="/course-2" className="block px-4 py-2">
                    Course 2
                  </Link>
                </div>
              )}
            </div>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-batch"  // Link to "My Batch" page
                  className="font-semibold text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Batch
                </Link>
                <button
                  className="font-semibold text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="font-semibold text-blue-600"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
                <button
                  className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal openModal={isLoginModalOpen} setOpenModal={setIsLoginModalOpen} />

      {/* Sign Up Modal */}
      <SignUpModal openModal={isSignUpModalOpen} setOpenModal={setIsSignUpModalOpen} />
    </>
  );
};

export default Navbar;
