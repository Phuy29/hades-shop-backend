const productController = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", productController.getAllProduct);

router.get("/trash", verifyTokenAndAdmin, productController.getAllProductTrash);

router.get("/:slug", productController.getOneProduct);

router.post("/", verifyTokenAndAdmin, productController.addProduct);

router.put("/:slug", verifyTokenAndAdmin, productController.updateProduct);

router.delete("/:slug", verifyTokenAndAdmin, productController.deleteProduct);

router.patch(
  "/restore/:slug",
  verifyTokenAndAdmin,
  productController.restoreProduct
);

router.delete(
  "/delete/force/:id",
  verifyTokenAndAdmin,
  productController.deleteProductForce
);

router.post(
  "/delete/checked-products",
  verifyTokenAndAdmin,
  productController.deleteCheckedProduct
);

module.exports = router;
