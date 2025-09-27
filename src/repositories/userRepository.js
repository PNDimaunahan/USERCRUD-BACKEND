const { mongoose } = require('../config/db');

const userSchema = new mongoose.Schema({
    UserId: { type: Number, required: true, unique: true },
    UserCode: { type: String, required: true, unique: true },
    FirstName: { type: String, required: true },
    MiddleName: { type: String },
    LastName: { type: String, required: true },
    Sex: { type: String, enum: ['Male','Female'], required: true },
    Role: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    Status: { type: String, enum: ['Active','Inactive','Suspended','Archived'], default: 'Active' },
    Archived: { type: Boolean, default: false },
    archivedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

