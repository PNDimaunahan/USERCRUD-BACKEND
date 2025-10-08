const { success } = require('zod')
const userService = require('../services/userService')

exports.createUser = async (req, res) => {
  try {

    for (const [key, value] of Object.entries(req.body)) {
      if (key === "MiddleName") continue;
      if (typeof value === 'string' && value.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: `${key} cannot be empty or only spaces`
        })
      }
    }

    const user = await userService.createUser(req.body)

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    })
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'asc' } = req.query
    const users = await userService.getAllUsers(
      parseInt(page),
      parseInt(limit),
      sortBy,
      sortOrder
    )
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user
    })
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    })
  }
}

exports.archiveUser = async (req, res) => {
  try {
    const user = await userService.archiveUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ 
      success: true,
      message: 'User archived successfully', 
      data: user 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.unarchiveUser = async (req, res) => {
  try {
    const user = await userService.unarchiveUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ 
      success: true,
      message: 'User unarchived successfully', 
      data: user 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.hardDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.hardDeleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User permanently deleted successfully',
      data: { userId: id }
    });
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error.message || 'Failed to permanently delete user'
    });
  }
};

