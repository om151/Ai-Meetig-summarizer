import express from "express";
import { generateSummary } from "../Controllers/summary.Controller.js";
const summaryRouter = express.Router();


summaryRouter.post("/", generateSummary);

export default summaryRouter;