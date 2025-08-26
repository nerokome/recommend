import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recommendationRoutes from "./routes/recommendationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/recommendations", recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
