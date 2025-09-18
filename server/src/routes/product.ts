import { createProduct, getFeature, getnewArrival, getProductByFilter, getProductById, getProudctsMeta, updateProduct } from "../controllers/product";
import { Router } from "express";
import { protact } from "../middleware/protact";
import { isAdmin } from "../middleware/roleMiddleware";
import { validator } from "../middleware/validator";
import { createProductValidator } from "../validators/productvalidator";
import { upload } from "../utils/upload";

const router = Router()

//admin can only request these route
router.post("/",protact,isAdmin,upload.array("images"),createProduct)
//get product by filter
router.get("/",getProductByFilter)
//get newArrival
router.get("/newArrival",getnewArrival)
//get feature
router.get("/feature",getFeature)
//get single product
router.get("/one/:productId",getProductById)
//admin can only request these route
router.post("/:id",protact,isAdmin,upload.array("images"),updateProduct)
//get product metaData
router.get('/filterMeta',getProudctsMeta)
export default router;