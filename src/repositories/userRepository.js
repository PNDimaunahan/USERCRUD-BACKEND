const { mongoose } = require('../config/db');

const userSchema = new mongoose.Schema({
    UserId: { type: Number, unique: true },
    UserCode: { type: String, unique: true },
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

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    return {
      UserId: ret.UserId,
      UserCode: ret.UserCode,
      FirstName: ret.FirstName,
      MiddleName: ret.MiddleName,
      LastName: ret.LastName,
      Sex: ret.Sex,
      Role: ret.Role,
      DateOfBirth: ret.DateOfBirth,
      Email: ret.Email,
      PhoneNumber: ret.PhoneNumber,
      Status: ret.Status,
      Archived: ret.Archived,
      archivedAt: ret.archivedAt,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
      _id: ret._id,
      __v: ret.__v
    };
  }
});

userSchema.pre('save', async function(next){
    if(this.isNew){
        const lastUser = await this.constructor.findOne().sort({UserId: -1});
        const nextId = lastUser ? lastUser.UserId + 1 : 1;

        this.UserId = nextId;
        this.UserCode = `USR${nextId.toString().padStart(3, '0')}`;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

