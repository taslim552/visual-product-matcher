// backend/server.js
import 'dotenv/config'; 
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from "url";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------------------- Middleware ----------------------
app.use(express.json());
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------- MongoDB Connection ----------------------
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/visual_product_matcher";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------------- API Routes ----------------------
app.use("/api/products", productRoutes);

// ---------------------- Serve React Frontend ----------------------
// if (process.env.NODE_ENV === "production") {
//   const frontendBuildPath = path.join(__dirname, "../frontend/build");
//   app.use(express.static(frontendBuildPath));

//   // ✅ Fixed route
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendBuildPath, "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => res.send("API is running..."));
// }


// ---------------------- Start Server ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
