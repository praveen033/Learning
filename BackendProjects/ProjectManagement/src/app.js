import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "htpp://localhost:8000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

import healthCheckRouter from "./routes/healthCheckRoutes.js";
app.use("/api/v1/healthcheck", healthCheckRouter);

import registerUser from "./routes/userAuthRoutes.js";
app.use("/api/v1/auth", registerUser);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
