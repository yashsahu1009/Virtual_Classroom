 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenModal(false); // Close Login Modal
  };

  const handleOpenSignUp = () => {
    setOpenModal(false); // Close Login Modal
    navigate("/signup"); // Navigate to SignUp page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    handleClose(); // Close modal after submission
  };

  return (
    openModal && (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50 p-4">
        <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <h2 className="text-2xl mb-4 text-center text-white">
            Login or Sign Up to Start Learning
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white font-medium">
                What's your email?
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-md bg-[#262626] text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white font-medium">
                Your password?
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-md bg-[#262626] text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#6674CC] text-white rounded-md hover:bg-[#5a56e5] transition"
            >
              Login
            </button>
          </form>
          {/* Footer Links */}
          <div className="flex justify-between mt-4 text-sm">
            <button   onClick={() => navigate("/sign")} className="text-[#6674CC] hover:underline">
              Create Account
            </button>
            <button onClick={() => navigate("/forgot-password")} className="text-[#6674CC] hover:underline">
              Forgot your password?
            </button>
          </div>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default LoginModal;
