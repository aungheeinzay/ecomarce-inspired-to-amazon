
import { Router } from "express";
import { protact } from "../middleware/protact";
import { confirmSessionId, createOrderAndCheckoutSession } from "../controllers/order";
import { sessionIdvalidator } from "../validators/validator";
import { validator } from "../middleware/validator";

const router = Router()

router.post("/create-checkout-session",protact,createOrderAndCheckoutSession)
router.get("/conform/:sessionId",protact,sessionIdvalidator,validator,confirmSessionId)
export default router;