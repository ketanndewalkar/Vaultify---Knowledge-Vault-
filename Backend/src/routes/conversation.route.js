import express from "express"
import { createSession, handleChat } from "../controllers/conversation.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router()

router.get("/get-chat-session",authMiddleware,createSession)
router.post("/query",authMiddleware,handleChat)

export default router;