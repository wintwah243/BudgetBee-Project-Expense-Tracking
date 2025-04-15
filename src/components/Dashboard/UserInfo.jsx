import React, { useState, useEffect } from 'react';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import CharAvatar from '../cards/CharAvatar';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingName, setEditingName] = useState(false);
  const [editingProfilePic, setEditingProfilePic] = useState(false);

  const [newName, setNewName] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        setUser(response.data);
        setNewName(response.data.fullName);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleSubmitName = async (e) => {
    e.preventDefault();
    setError('');

    if (!newName.trim()) {
      setError('Name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8000/api/v1/auth/update-profile',
        { name: newName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        fullName: newName,
      }));
      setEditingName(false);
    } catch (err) {
      console.error('Error updating profile:', err.response || err.message);
      setError('Failed to update profile');
    }
  };

  const handleSubmitProfilePic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newProfilePic) {
      formData.append('profilePic', newProfilePic);
    }

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE_PIC, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile picture updated!');
      setUser((prev) => ({
        ...prev,
        profileImageUrl: `${response.data.user.profileImageUrl}?t=${new Date().getTime()}`,
      }));
      setEditingProfilePic(false);
      setNewProfilePic(null);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
       </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
     <DashboardLayout>
      <div className="max-w-3xl w-full mx-auto mt-10 mb-20 px-4">
        
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm text-gray-700 border rounded-full p-[10px] hover:text-yellow-500 mb-6 transition-colors duration-200"
        >
          <FiArrowLeft size={18} />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Profile Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-yellow-300"
              />
            ) : (
              <CharAvatar
                fullName={user.fullName}
                width="w-20"
                height="h-20"
                style="text-xl"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.fullName || 'No Name'}</h2>
              <p className="text-sm text-gray-500">Personal Info</p>
            </div>
          </div>
          <button
            onClick={() => setEditingProfilePic(true)}
            className="bg-yellow-100 text-yellow-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-yellow-200 transition"
          >
            <FiEdit className="inline-block mr-2" />
            Edit Picture
          </button>
        </div>

        {editingProfilePic && (
          <form onSubmit={handleSubmitProfilePic} className="mb-10 space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProfilePic(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-yellow-50 file:text-yellow-700
                         hover:file:bg-yellow-100"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Save Picture
            </button>
          </form>
        )}

        {/* User Name Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-700 font-semibold">Full Name</h3>
            {!editingName && (
              <button
                onClick={() => setEditingName(true)}
                className="text-sm text-yellow-600 hover:text-yellow-800 flex items-center"
              >
                <FiEdit className="mr-1" />
                Edit
              </button>
            )}
          </div>

          {editingName ? (
            <form onSubmit={handleSubmitName} className="space-y-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 w-full rounded-lg hover:bg-yellow-600 transition"
              >
                Save Name
              </button>
            </form>
          ) : (
            <div className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 text-base bg-white">
              {user?.fullName || 'No Name'}
            </div>
          )}
        </div>

        {/* Email Section */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-semibold mb-1">Email</h3>
          <div className="w-full border border-gray-300 rounded-lg p-2 text-gray-600 text-base bg-gray-50">
            {user?.email || 'No Email'}
          </div>
        </div>
        
        {/* Cute Banner Section */}
        <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow-sm">
          <h4 className="text-lg font-semibold text-yellow-700 mb-1">✨ Keep Going!</h4>
          <p className="text-sm text-gray-700">
            "Take control of your finances — track, save, and grow with confidence."
          </p>
        </div>

      </div>
     </DashboardLayout>
  );



};

export default UserInfo;
