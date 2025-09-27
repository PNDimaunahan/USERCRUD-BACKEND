const User = require('../repositories/userRepository');

exports.createUser = async (data) => {
    return await User.create(data);
};

exports.getAllUsers = async (page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'asc') => {
    const skip = (page - 1) * limit;
    const sort = {[sortBy]: sortOrder === 'desc' ? -1 : 1};

    const users = await User.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
      const total = await User.countDocuments();

      return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit),
        data: users
      };
};

exports.getUserById = async (id) => {
    return await User.findById(id);
};

exports.updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.hardDeleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

exports.archiveUser = async (id) => {
    return await User.findByIdAndUpdate(
        id,
        { Status: 'Archived', Archived: true, archivedAt: new Date() },
        { new: true }
    );
};

exports.unarchiveUser = async (id) => {
    return await User.findByIdAndUpdate(
        id,
        { Archived: false, archivedAt: null },
        { new: true }
    );
};
