import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSun, HiOutlineMoon, HiOutlineDesktopComputer, HiOutlineLockClosed } from 'react-icons/hi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const themeOptions = [
  { value: 'light', label: 'Light', icon: HiOutlineSun },
  { value: 'dark', label: 'Dark', icon: HiOutlineMoon },
  { value: 'system', label: 'System', icon: HiOutlineDesktopComputer },
];

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { updateProfile } = useAuth();
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (passwords.password !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('password', passwords.password);
      await updateProfile(formData);
      toast.success('Password updated successfully');
      setPasswords({ password: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-8">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">Appearance</h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Choose how LOGAN AI looks on your device.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all ${
                  theme === opt.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
              >
                <opt.icon
                  className={`h-8 w-8 ${
                    theme === opt.value ? 'text-primary-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    theme === opt.value ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <HiOutlineLockClosed /> Change Password
          </h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Update your password to keep your account secure.
          </p>

          <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New password
              </label>
              <input
                type="password"
                value={passwords.password}
                onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm new password
              </label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <LoadingSpinner size="sm" /> : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
