import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig"; 
import { clearUser } from "../store/authReducers/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);   // Firebase logout
      dispatch(clearUser()); // Clear Redux state
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to Dashboard 🎉</h2>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
