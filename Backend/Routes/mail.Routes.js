import express from "express";
import { sendMail } from "../Controllers/mail.Controller.js";
const mailRouter = express.Router();


mailRouter.post("/", sendMail);


export default mailRouter;


