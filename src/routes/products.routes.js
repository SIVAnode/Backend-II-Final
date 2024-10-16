import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { productValidation } from "../middlewares/productValidation.js";
import { idValidation } from "../middlewares/idValidation.js";
import passport from "passport";
import { roleValidation } from "../middlewares/rolevalidation.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:pid", productController.getProductById);

productRouter.post("/", productValidation, passport.authenticate("jwt",{session: false}), roleValidation(['admin']), productController.createProduct);

productRouter.post("/baseinicio", productController.createProduct);

productRouter.put("/:pid", idValidation, passport.authenticate("jwt",{session: false}), roleValidation(['admin']), productController.updateProduct);

productRouter.delete("/:pid", passport.authenticate("jwt",{session: false}), roleValidation(['admin']), productController.deleteProduct)

export default productRouter;