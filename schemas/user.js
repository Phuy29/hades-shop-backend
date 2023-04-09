const { z } = require("zod");

const registerSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = { registerSchema, loginSchema };
