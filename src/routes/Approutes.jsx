import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy imports
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const PageNotFound = React.lazy(() => import("../pages/PageNotFound"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Unauthorized = React.lazy(() => import("../pages/UnAuthorized"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

// Auth utilities
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AuthListener from "../store/authReducers/AuthListner";

const AppRoutes = () => {
  return (
    <>
      {/* Firebase Auth state listener */}
      <AuthListener />

      <Suspense fallback={<h6 style={{ textAlign: "center" }}>Loading...</h6>}>
        <Routes>
          {/* Public Routes (accessible to everyone) */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>}/>
          <Route path="/register" element={   <PublicRoutes>     <Register />   </PublicRoutes>}/>
          <Route  path="/forgot-password"  element={    <PublicRoutes>      <ForgotPassword />    </PublicRoutes>  }/>

          {/* Private Routes (authenticated users only) */}
          <Route  path="/dashboard/*"  element={    <PrivateRoutes>      <Dashboard />    </PrivateRoutes>  }/>

          {/* Special Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Catch-All (fallback) */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
