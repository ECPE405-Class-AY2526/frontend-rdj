import React from "react";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import HealthPage from "./pages/HealthPage";

const App = () => {
  return (
    <AuthProvider>
      <div>
        {/* pwd ka d ka manipulate e.g. if ang nag login is admin [local_user_role==admin] then pd mo e pakita ang route nga e.g. UserManagementTab  */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route path="/health" element={<HealthPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
