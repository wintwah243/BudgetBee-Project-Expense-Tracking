import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'; // Adjust import as needed
import { API_PATHS } from '../../utils/apiPaths'; // Adjust import as needed
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'; // Adjust import as needed

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    // Get token from URL params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Save the token to localStorage
      
      axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log("Google Auth user data:", res.data); // Optional: Check response
        updateUser(res.data); // Save user info to context
        navigate("/dashboard", { replace: true }); // Redirect to dashboard
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        navigate("/login", { replace: true }); // Redirect to login on error
      });
    }
  }, [navigate, updateUser]);

  return (
    <div>Loading...</div> 
  );
};

export default GoogleAuthCallback;
