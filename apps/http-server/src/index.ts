import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();
app.use(express.json());

app.get("/health-check", authMiddleware, (req, res) => {
  res.json({
    message: "working fine",
  });
});

app.use("/api/v1", authRoutes);

app.listen(4000);
