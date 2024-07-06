import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyLogin from "./pages/auth/MyLogin";
import MyRegister from "./pages/auth/MyRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/protectedRoute";
import PublicRoute from "./components/Routes/publicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Donar Page */}

          <Route
            path="/donar"
            element={
              <ProtectedRoute>
                <Donar />
              </ProtectedRoute>
            }
          />

          {/* Hospital Page */}

          <Route
            path="/hospital"
            element={
              <ProtectedRoute>
                <Hospitals />
              </ProtectedRoute>
            }
          />

          {/* Analytics Page */}

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* Consumer Page */}
          <Route
            path="/consumer"
            element={
              <ProtectedRoute>
                <Consumer />
              </ProtectedRoute>
            }
          />

          {/* Donation Page */}
          <Route
            path="/donation"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />

          {/* Oranisation Page */}

          <Route
            path="/organisation"
            element={
              <ProtectedRoute>
                <OrganisationPage />
              </ProtectedRoute>
            }
          />

          {/* Home Page */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <MyLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <MyRegister />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
