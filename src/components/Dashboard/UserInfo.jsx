import React, { useState, useEffect } from 'react';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import CharAvatar from '../cards/CharAvatar';
import AuthLayout from '../layouts/AuthLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <AuthLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>{error}</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mt-6 mb-10">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-[600px] max-w-md border border-yellow-100">
          {/* Back to Dashboard Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-sm text-gray-700 border rounded-full p-[10px] hover:text-yellow-500 mb-6 transition-colors duration-200"
          >
            <FiArrowLeft size={20} />
            <span className="font-semibold">Back to Dashboard</span>
          </button>

          {/* Profile Pic */}
          {editingProfilePic ? (
            <form onSubmit={handleSubmitProfilePic} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="profilePic" className="text-yellow-600 font-semibold">Upload New Picture:</label>
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProfilePic(e.target.files[0])}
                  className="border rounded-lg p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Save Picture
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 mb-6">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-yellow-200"
                />
              ) : (
                <CharAvatar
                  fullName={user.fullName}
                  width="w-24"
                  height="h-24"
                  style="text-2xl"
                />
              )}
              <button
                onClick={() => setEditingProfilePic(true)}
                className="text-yellow-500 text-sm flex items-center gap-1 hover:text-gray:700"
              >
                <FiEdit /> Edit Picture
              </button>
            </div>
          )}

          {/* Name */}
          {editingName ? (
            <form onSubmit={handleSubmitName} className="space-y-4">
              <label htmlFor="name" className="text-yellow-600 font-semibold">Full Name:</label>
              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Save Name
              </button>
            </form>
          ) : (
            <div className="mb-6">
              <div className="text-gray-600 font-semibold mb-1">Full Name:</div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-lg text-gray-900 font-bold">{user?.fullName || 'No Name'}</div>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-yellow-500 text-sm flex items-center gap-1 hover:text-pink-600 transition-colors"
                >
                  <FiEdit size={16} /> Edit
                </button>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <div className="text-gray-600 font-semibold">Email:</div>
            <div className="text-gray-500 text-sm">{user?.email || 'No Email'}</div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserInfo;
