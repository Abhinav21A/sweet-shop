import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import sweetsRoutes from "./routes/sweets";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

export default app;
