import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignUpModal from "./Components/SignUpModal";
import LoginModal from "./Components/LoginModal";
import Students from "./Components/Students";
import Content from "./Components/Content";
import Dsasheet from "./Components/Dsasheet";
import Footer from "./Components/Footer";
import SigmaCoursePage from "./Components/SigmaCoursePage";
import PaymentPage from "./Components/PaymentPage";
import Courses from "./Components/Courses";
import Playlist from "./Components/Playlist";
import PasswordResetModal from "./Components/PasswordRestModal";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);

  // Get the current route
  const location = useLocation();

  return (
    <>
      {/* ✅ Hide Navbar only on the Admin Page */}
      {location.pathname !== "/admin" && (
        <Navbar
          setIsLoginModalOpen={() => {
            setIsLoginModalOpen(true);
            setIsSignUpModalOpen(false);
            setIsPasswordResetOpen(false);
          }}
          setIsSignUpModalOpen={() => {
            setIsSignUpModalOpen(true);
            setIsLoginModalOpen(false);
            setIsPasswordResetOpen(false);
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<><Content /><Students /><Footer /></>} />
        <Route path="/sigma-course" element={<><SigmaCoursePage /><Footer /></>} />
        <Route path="/dsa-sheet" element={<Dsasheet />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/forgot-password" element={<PasswordResetModal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* ✅ Ensure modals function properly */}
      {isSignUpModalOpen && (
        <SignUpModal 
          openModal={isSignUpModalOpen} 
          setOpenModal={setIsSignUpModalOpen} 
          setIsLoginModalOpen={setIsLoginModalOpen} 
        />
      )}
      {isLoginModalOpen && (
        <LoginModal 
          openModal={isLoginModalOpen} 
          setOpenModal={setIsLoginModalOpen} 
          setIsSignUpModalOpen={setIsSignUpModalOpen} 
          setIsPasswordResetOpen={setIsPasswordResetOpen} 
        />
      )}
      {isPasswordResetOpen && (
        <PasswordResetModal 
          openModal={isPasswordResetOpen} 
          setOpenModal={setIsPasswordResetOpen} 
          setIsLoginModalOpen={setIsLoginModalOpen} 
        />
      )}
    </>
  );
}

export default App;
