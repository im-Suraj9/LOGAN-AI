const User = require('../models/User');

/**
 * @desc    Update the logged-in user's profile (name, bio, theme, avatar)
 * @route   PUT /api/user/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, bio, theme, password } = req.body;

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (theme && ['light', 'dark', 'system'].includes(theme)) user.theme = theme;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      user.password = password;
    }

    // If a file was uploaded via multer, store its relative path
    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
      theme: updatedUser.theme,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile };
