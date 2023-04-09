const collectionController = require("../controllers/collectionController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", collectionController.getAllCollection);

router.get("/:slug", collectionController.getOneCollection);

router.post("/", verifyTokenAndAdmin, collectionController.addCollection);

router.put(
  "/:slug",
  verifyTokenAndAdmin,
  collectionController.updateCollection
);

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  collectionController.deleteCollection
);

module.exports = router;
