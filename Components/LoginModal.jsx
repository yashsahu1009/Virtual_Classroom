import React, { useState } from "react";

const LoginModal = ({ openModal, setOpenModal, setIsSignUpModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  

  const handleClose = () => {
    setOpenModal(false); 
    setError("");  
  };

  const handleOpenSignUp = () => {
    setOpenModal(false);
    setIsSignUpModalOpen(true);
  };

  const handleForgotPassword = () => {
    setOpenModal(false);
    console.log("Forgot Password Clicked (You can open another modal here)");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Successful:", data);

        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

       
        handleClose();
        
        
      
      } else {
        setError(data.message || "Invalid email or password");  
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    openModal && (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50 p-4">
        <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <h2 className="text-2xl mb-4 text-center text-white">
            Login or Sign Up to Start Learning
          </h2>

          {error && <p className="text-red-500 text-center mb-3">{error}</p>} {/* Show error */}

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
            <button
              onClick={handleOpenSignUp}
              className="text-[#6674CC] hover:underline"
            >
              Create Account
            </button>
            <button
              onClick={handleForgotPassword}
              className="text-[#6674CC] hover:underline"
            >
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
