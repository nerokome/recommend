import express from "express";
import { sendRecommendation } from "../controller/recommendationController.js";

const router = express.Router();

router.post("/send", sendRecommendation);

export default router;
