// server/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import summaryRouter from "./Routes/summary.Routes.js";
import mailRouter from "./Routes/mail.Routes.js";

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/summary", summaryRouter);

app.use("/api/send-email", mailRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
