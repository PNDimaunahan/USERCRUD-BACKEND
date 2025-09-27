const userService = require('../services/userService')

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
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
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.archiveUser = async (req, res) => {
  try {
    const user = await userService.archiveUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User archived successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unarchiveUser = async (req, res) => {
  try {
    const user = await userService.unarchiveUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User unarchived successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.hardDeleteUser = async (req, res) => {
  try {
    const user = await userService.hardDeleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User permanently deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

