const userController = require("../controllers/userController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", verifyTokenAndAdmin, userController.getAllUser);

router.get("/:id", verifyTokenAndAdmin, userController.getOneUser);

router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

router.put("/:id", verifyTokenAndAdmin, userController.updateUser);

module.exports = router;
