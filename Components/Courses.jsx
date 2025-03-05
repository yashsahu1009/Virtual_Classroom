import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "APTITUDE PREPARATION (HINGLISH)",
      description: "This batch contains Aptitude resources in Hinglish Language.",
      progress: 35,
      accessUntil: "14 Aug 2027",
      path: "/Playlist",
    },
    {
      title: "SIGMA 2 (DSA)",
      description: "Web Development.",
      progress: 63,
      accessUntil: "31 Dec 2025",
      path: "/sigma-2-dsa",
    },
    {
      title: "DELTA LIBRARY",
      description: "This is the Library of Projects for Delta (Web Development Batch).",
      progress: 23,
      accessUntil: "21 Feb 2026",
      path: "/delta-library",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 relative"
        >
          <div className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            Access until {card.accessUntil}
          </div>
          <div className="w-full h-32 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={`/images/${card.title.replace(/\s+/g, "-").toLowerCase()}.jpg`} alt={card.title} className="h-full object-cover rounded-lg" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{card.description}</p>
          <div className="text-sm font-semibold mb-2">
            {card.progress}% COMPLETE
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${card.progress}%` }}
            ></div>
          </div>
          <button
            onClick={() => navigate(card.path)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full hover:bg-blue-600 transition"
          >
            Continue
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
