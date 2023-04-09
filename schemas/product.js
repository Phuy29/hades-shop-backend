const { z } = require("zod");

const addProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  colors: z.array(z.object({ name: z.string(), color: z.string() })),
  size: z.array(z.string()),
  imgUrl: z.string(),
  imgUrlHover: z.string(),
  collectionId: z.string(),
});

const updateProductSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  colors: z.array(z.object({ name: z.string(), color: z.string() })).optional(),
  size: z.array(z.string()).optional(),
  imgUrl: z.string().optional(),
  imgUrlHover: z.string().optional(),
  collectionId: z.string().optional(),
});

const deleteCheckedProductSchema = z.array(z.string());

module.exports = {
  addProductSchema,
  updateProductSchema,
  deleteCheckedProductSchema,
};
