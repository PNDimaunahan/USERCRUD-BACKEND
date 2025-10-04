const { z } = require('zod');

const userSchema = z.object({
  UserId: z.number().int().positive(),
  UserCode: z.string().min(5),
  FirstName: z.string().min(1),
  MiddleName: z.string().optional(),
  LastName: z.string().min(1),
  Sex: z.enum(['Male', 'Female']),
  Role: z.string(),
  DateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid date format"
  }),
  Email: z.string().email(),
  PhoneNumber: z.string().min(10),
  Status: z.enum(['Active', 'Inactive', 'Suspended', "Archived", "Unarchived"]).optional(),
  Archived: z.boolean().optional(),
  archivedAt: z.string().optional()
});

module.exports = userSchema;
