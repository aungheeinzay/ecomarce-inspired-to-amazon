import { createProduct, getFeature, getnewArrival, getProductByFilter, getProductById, getProudctsMeta, updateProduct } from "../controllers/product";
import { Router } from "express";
import { protact } from "../middleware/protact";
import { isAdmin } from "../middleware/roleMiddleware";
import { validator } from "../middleware/validator";

const router = Router()

//admin can only request these route
router.post("/",validator,protact,isAdmin,createProduct)
//get product by filter
router.get("/",getProductByFilter)
//get newArrival
router.get("/newArrival",getnewArrival)
//get feature
router.get("/feature",getFeature)
//get single product
router.get("/one/:productId",getProductById)
//admin can only request these route
router.post("/:id",protact,isAdmin,updateProduct)
//get product metaData
router.get('/filterMeta',getProudctsMeta)
export default router;