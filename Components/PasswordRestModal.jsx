import React from "react";
import { motion } from "framer-motion";

const PasswordResetModal = ({ openModal, setOpenModal }) => {
  if (!openModal) return null; // Ensure modal only renders when open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 text-white rounded-lg shadow-lg w-96 p-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">GET A BRAND NEW PASSWORD!</h2>
          <button
            className="text-white text-lg hover:text-gray-300"
            onClick={() => setOpenModal(false)}
          >
            &times;
          </button>
        </div>
        <p className="mt-4 text-sm">What's your e-mail?</p>
        <input
          type="email"
          placeholder="E-mail"
          className="w-full mt-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => alert("Password reset link sent")}
          >
            OK
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordResetModal;
