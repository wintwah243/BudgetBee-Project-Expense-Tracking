import React from 'react';
import { Link } from 'react-router-dom';
import budgetbeeLogo from '../../assets/images/BudgetBee.png';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-800 px-4">
      
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold">
          Budget<span className="text-yellow-500">Bee</span>
        </h1>
        <img src={budgetbeeLogo} alt="BudgetBee" className="w-20 ml-2" />
      </div>

      <p className="text-center max-w-xl text-lg md:text-xl mb-10">
        Welcome to <strong>BudgetBee</strong> — your smart and simple expense tracker. Manage your spending, plan your budget, and achieve your financial goals, all in one place.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition">
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-100 rounded-lg font-medium transition">
          Get Started
        </Link>
      </div>

      <p className="mt-12 text-sm text-gray-500">&copy; {new Date().getFullYear()} BudgetBee. All rights reserved.</p>
    </div>
  );
};

export default Welcome;
