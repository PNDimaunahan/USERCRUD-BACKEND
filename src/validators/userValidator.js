const { z } = require('zod')

const userSchema = z.object({
  UserId: z.number().int().positive(),
  UserCode: z.string().min(3),
  FirstName: z.string().min(2),
  MiddleName: z.string().optional(),
  LastName: z.string().min(2),
  Sex: z.enum(["Male", "Female"]),
  Role: z.string(),
  DateOfBirth: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  Email: z.string().email(),
  PhoneNumber: z.string().min(10).max(15),
  Status: z.enum(["Active", "Inactive"])
})

const createUserSchema = userSchema

const updateUserSchema = userSchema.partial()

module.exports = {
  createUserSchema,
  updateUserSchema
}