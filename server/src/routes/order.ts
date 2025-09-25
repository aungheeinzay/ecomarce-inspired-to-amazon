
import { Router } from "express";
import { protact } from "../middleware/protact";
import { changeOrderStatus, confirmSessionId, createOrderAndCheckoutSession, getAllOrder, getOrderByUser } from "../controllers/order";
import { sessionIdvalidator } from "../validators/validator";
import { validator } from "../middleware/validator";
import { isAdmin } from "../middleware/roleMiddleware";

const router = Router()

router.post("/create-checkout-session",protact,createOrderAndCheckoutSession)
router.get("/conform/:sessionId",protact,sessionIdvalidator,validator,confirmSessionId)
router.get("/allOrder",protact,isAdmin,getAllOrder)
router.get("/order",protact,getOrderByUser)
router.post("/orders/:orderId",protact,isAdmin,changeOrderStatus)
export default router;