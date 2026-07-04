import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineCamera, HiOutlinePencil } from 'react-icons/hi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api/axios';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Resolves an avatar path returned from the backend (e.g. /uploads/xyz.png)
 * into a full URL pointing at the API server.
 */
const resolveAvatarUrl = (avatar) => {
  if (!avatar) return null;
  if (avatar.startsWith('http')) return avatar;
  const origin = API_URL.replace(/\/api\/?$/, '');
  return `${origin}${avatar}`;
};

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(resolveAvatarUrl(user?.avatar));
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      if (avatarFile) formData.append('avatar', avatarFile);

      await updateProfile(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Your Profile">
      <div className="glass-card rounded-2xl p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="group relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-2xl font-bold text-white shadow-lg">
                {avatarPreview ? (
                  <img src={avatarPreview} alt={name} className="h-full w-full object-cover" />
                ) : (
                  name?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md transition-transform hover:scale-110"
                title="Change avatar"
              >
                <HiOutlineCamera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user?.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <HiOutlinePencil className="h-4 w-4" /> Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input type="email" value={user?.email || ''} disabled className="input-field opacity-60" />
            <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="Tell us a little about yourself..."
              className="input-field resize-none"
            />
            <p className="mt-1 text-right text-xs text-gray-400">{bio.length}/200</p>
          </div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? <LoadingSpinner size="sm" /> : 'Save Changes'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
