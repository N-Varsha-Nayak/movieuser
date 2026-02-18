import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { initializeDatabase } from "./config/db.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  allowedOrigins.push("http://localhost:5173");
}

if (!allowedOrigins.includes("http://localhost:5174")) {
  allowedOrigins.push("http://localhost:5174");
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", authRoutes);

(async () => {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize database", error.message);
    process.exit(1);
  }
})();
