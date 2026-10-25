import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { sendMessage ,getMessages} from "../controllers/messageController.js";
const router =express.Router();
router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated,getMessages);
export default router;

