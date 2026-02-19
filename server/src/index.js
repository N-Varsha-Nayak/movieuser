import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { initDb } from "./config/db.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked"));
    }
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", authRoutes);

(async () => {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error("Startup failed:", e.message);
    process.exit(1);
  }
})();