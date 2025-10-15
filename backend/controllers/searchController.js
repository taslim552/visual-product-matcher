// backend/controllers/searchController.js
import * as tf from "@tensorflow/tfjs"; // use tfjs-node for better performance
import * as mobilenet from "@tensorflow-models/mobilenet";
import Product from "../models/Product.js";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import fs from "fs";

// Load MobileNet once
let model;
const loadModel = async () => {
  if (!model) {
    console.log("🔄 Loading MobileNet...");
    model = await mobilenet.load();
    console.log("✅ MobileNet loaded");
  }
};
loadModel();

// Convert image to tensor
const imageToTensor = async (imagePathOrUrl) => {
  let image;
  // Handle URL or local file
  if (imagePathOrUrl.startsWith("http")) {
    const response = await fetch(imagePathOrUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    image = await loadImage(buffer);
  } else {
    // Ensure the path is absolute
    const absPath = path.isAbsolute(imagePathOrUrl)
      ? imagePathOrUrl
      : path.join(process.cwd(), imagePathOrUrl);
    if (!fs.existsSync(absPath)) {
      throw new Error(`File not found: ${absPath}`);
    }
    image = await loadImage(absPath);
  }

  const canvas = createCanvas(224, 224);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, 224, 224);

  const tensor = tf.browser.fromPixels(canvas)
    .expandDims(0)
    .toFloat()
    .div(127)
    .sub(1);

  return tensor;
};

// Compute embedding
export const getEmbedding = async (imagePathOrUrl) => {
  const tensor = await imageToTensor(imagePathOrUrl);
  const activation = model.infer(tensor, true); // true = embedding
  return Array.from(activation.dataSync());
};

// Cosine similarity
const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (magA * magB);
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    let inputPath = req.body.imageUrl;

    // Handle uploaded file
    if (req.file) {
      inputPath = path.join("uploads", req.file.filename);
    }

    if (!inputPath) {
      return res.status(400).json({ error: "Provide image URL or upload file" });
    }

    const inputEmbedding = await getEmbedding(inputPath);

    const products = await Product.find();
    const results = products
      .filter((p) => p.embedding && p.embedding.length > 0)
      .map((p) => ({
        ...p.toObject(),
        similarity: cosineSimilarity(inputEmbedding, p.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    res.json({ results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed", details: err.message });
  }
};
