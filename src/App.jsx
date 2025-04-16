import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Welcome from './pages/Dashboard/Welcome';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Welcome from './pages/Dashboard/Welcome';
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';
import GoogleAuthCallback from './pages/Auth/GoogleAuthCallback';
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/welcomepage' exact element={<Welcome />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signUp' exact element={<SignUp />} />
          <Route path='/welcomepage' exact element={<Welcome />} />
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/income' exact element={<Income />} />
          <Route path='/expense' exact element={<Expense />} />
          <Route path='/password-reset' exact element={<PasswordReset />} />
          <Route path='/forgotpassword/:id/:token' exact element={<ForgotPassword />} />
          <Route path='/google-auth' exact element={<GoogleAuthCallback />} />
        </Routes>
      </Router>
    </div>

    <Toaster 
      toastOptions={{
        className:"",
        style: {
          fontSize:'13px'
        },
      }}
    />
    </UserProvider>
  )
}

export default App

const Root = () => {
  //check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to welcome page
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/welcomepage" />
  )
}
