import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsSignUpModalOpen(false); // Close the sign-up modal if open
    setIsLoginModalOpen(true); // Open the login modal
  };

  const openSignUpModal = () => {
    setIsLoginModalOpen(false); // Close the login modal if open
    setIsSignUpModalOpen(true); // Open the sign-up modal
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        setIsLoginModalOpen={openLoginModal} // Use function to open login modal
        setIsSignUpModalOpen={openSignUpModal} // Use function to open sign-up modal
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Content />
              <Students />
              <Footer />
            </>
          }
        />
        <Route path="/sigma-course" element={   <> <SigmaCoursePage /> <Footer /></> } />
        <Route path="/dsa-sheet" element={<Dsasheet />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Playlist" element={<Playlist />}/>
        <Route path="/signup"element={<SignUpModal openModal={isSignUpModalOpen} setOpenModal={setIsSignUpModalOpen} />} />
        <Route path="/logout"element={<LoginModal openModal={isLoginModalOpen} setOpenModal={setIsLoginModalOpen} />} />
        <Route path="/"element={<LoginModal openModal={isLoginModalOpen} setOpenModal={setIsLoginModalOpen} />} />
        <Route path="/forgot-password"element={<PasswordResetModal/>} />
      </Routes>

      {/* Modals (Controlled via State) */}
      {isSignUpModalOpen && (
        <SignUpModal
          openModal={isSignUpModalOpen}
          setOpenModal={setIsSignUpModalOpen}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          openModal={isLoginModalOpen}
          setOpenModal={setIsLoginModalOpen}
        />
      )}
    </>
  );
}

export default App;