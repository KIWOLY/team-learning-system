import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/services";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileForm from "../components/Profile/ProfileForm";
import ProfileActions from "../components/Profile/ProfileActions";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    first_name: "", last_name: "", email: "", programme: "", year_of_study: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const API_URL = "/api/v1/profiles/me/";

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get(API_URL);
      setProfile({
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        email: response.data.email || user?.email || "",
        programme: response.data.programme || "",
        year_of_study: response.data.year_of_study || "",
      });
      if (response.data.profile_picture_url) {
        setPreviewImage(response.data.profile_picture_url);
      } else if (response.data.profile_picture) {
        setPreviewImage(response.data.profile_picture);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error.response?.data || error.message);
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
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePic(null);
    setPreviewImage("");
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append('first_name', profile.first_name || '');
      formData.append('last_name', profile.last_name || '');
      // Don't send email - backend will use authenticated user's email
      if (profile.programme) formData.append('programme', profile.programme);
      if (profile.year_of_study) formData.append('year_of_study', profile.year_of_study);
      
      if (profilePic) {
        formData.append('profile_picture', profilePic);
      }

      await api.put(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage("Profile updated successfully ✅");
      setIsEditing(false);
      setProfilePic(null);
      // Refresh profile data
      await fetchProfile();
      setTimeout(() => {
        setMessage("");
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      // Log detailed error to console only
      console.error('Profile update error:', error.response?.data || error.message);
      if (error.response?.data) {
        if (error.response.data.errors) {
          console.error('Validation errors:', error.response.data.errors);
        } else if (error.response.data.detail) {
          console.error('Error detail:', error.response.data.detail);
        } else {
          console.error('Field errors:', error.response.data);
        }
      }
      // Don't display error in browser - only in console
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage("");
    fetchProfile();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      {/* Added max-w-6xl for very wide but with rounded corners */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header - Light Blue with White Text */}
          <div className="bg-blue-500 px-6 py-8 sm:px-10 sm:py-12 rounded-t-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">My Profile</h1>
            <p className="text-blue-100 text-lg sm:text-xl mt-3 text-center">Manage your personal information</p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {message && (
              <div className={`mb-8 p-4 rounded-xl ${
                message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                <p className="text-sm font-medium text-center sm:text-left">{message}</p>
              </div>
            )}

            <ProfilePicture
              previewImage={previewImage}
              username={profile.first_name || user?.username || 'User'}
              isEditing={isEditing}
              onImageChange={handleImageChange}
              onRemoveImage={removeProfilePic}
            />

            <ProfileForm
              profile={profile}
              isEditing={isEditing}
              onChange={handleChange}
            />

            <ProfileActions
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;