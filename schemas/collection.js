const { z } = require("zod");

const addCollectionSchema = z.object({
  name: z.string(),
});

const updateCollectionSchema = addCollectionSchema;

module.exports = { addCollectionSchema, updateCollectionSchema };
