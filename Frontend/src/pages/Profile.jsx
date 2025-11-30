// src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/services";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileForm from "../components/Profile/ProfileForm";
import ProfileActions from "../components/Profile/ProfileActions";

const Profile = () => {
  const { id } = useParams(); // undefined → own profile, number → other user
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState({
    first_name: "", last_name: "", email: "", programme: "", year_of_study: "", profile_picture_url: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const API_URL = id 
    ? `/api/v1/profiles/${id}/` 
    : "/api/v1/profiles/me/";

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get(API_URL);
      const data = response.data;

      setProfile({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        programme: data.programme || "",
        year_of_study: data.year_of_study || "",
        profile_picture_url: data.profile_picture_url || data.profile_picture || "",
      });

      // Determine if this is the current user's profile
      setIsOwnProfile(!id || Number(id) === currentUser?.id);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setMessage("Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profile_picture_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append('first_name', profile.first_name || '');
      formData.append('last_name', profile.last_name || '');
      if (profile.programme) formData.append('programme', profile.programme);
      if (profile.year_of_study) formData.append('year_of_study', profile.year_of_study);

      // Only allow image upload for own profile
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput?.files[0]) {
        formData.append('profile_picture', fileInput.files[0]);
      }

      await api.put("/api/v1/profiles/me/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage("Profile updated successfully");
      setIsEditing(false);
      await fetchProfile();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error('Update failed:', error.response?.data || error);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || "User";

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

          {/* Header */}
          <div className="bg-blue-500 px-6 py-8 sm:px-10 sm:py-12 rounded-t-2xl relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-6 text-white hover:bg-blue-600/30 px-3 py-1 rounded-lg transition"
            >
              ← Back
            </button>

            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
              {isOwnProfile ? "My Profile" : `${fullName}'s Profile`}
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl mt-3 text-center">
              {isOwnProfile 
                ? "Manage your personal information" 
                : "View team member details"}
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {message && (
              <div className={`mb-8 p-4 rounded-xl text-center font-medium ${
                message.includes("success") || message.includes("✅")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {message}
              </div>
            )}

            {/* Profile Picture - Read-only for others */}
            <ProfilePicture
              previewImage={profile.profile_picture_url}
              username={fullName}
              isEditing={isEditing && isOwnProfile}
              onImageChange={handleImageChange}
              onRemoveImage={() => setProfile(prev => ({ ...prev, profile_picture_url: "" }))}
              disabled={!isOwnProfile}
            />

            {/* Profile Form */}
            <ProfileForm
              profile={profile}
              isEditing={isEditing && isOwnProfile}
              onChange={handleChange}
              disabled={!isOwnProfile}
            />

            {/* Actions */}
            {isOwnProfile ? (
              <ProfileActions
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onSave={handleSave}
                onCancel={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                loading={loading}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 italic">
                  {profile.first_name}'s profile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;