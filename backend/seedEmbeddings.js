import mongoose from 'mongoose';
import Product from './models/Product.js';
import path from 'path';
import fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { createCanvas, loadImage } from 'canvas';

// Convert image to tensor using canvas
const imageToTensor = async (imagePath) => {
  if (!fs.existsSync(imagePath)) {
    throw new Error('File not found: ' + imagePath);
  }

  const img = await loadImage(imagePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const tensor = tf.browser.fromPixels(canvas)
    .resizeBilinear([224, 224])
    .expandDims(0)
    .toFloat()
    .div(127)
    .sub(1); // Normalize to [-1, 1]

  return tensor;
};

// Get embedding using MobileNet
const getEmbedding = async (imagePath, model) => {
  const tensor = await imageToTensor(imagePath);
  const activation = model.infer(tensor, true); // true returns embedding
  return Array.from(activation.dataSync());
};

// Load MobileNet once
let model;
const loadModel = async () => {
  if (!model) {
    console.log('🔄 Loading MobileNet model...');
    model = await mobilenet.load();
    console.log('✅ MobileNet model loaded');
  }
};

// Seed embeddings
const seedEmbeddings = async () => {
  try {
    await loadModel();

    await mongoose.connect("mongodb://127.0.0.1:27017/visual_product_matcher");
    console.log("✅ MongoDB connected");

    const products = await Product.find();

    for (let product of products) {
      if (product.embedding && product.embedding.length > 0) continue;

      const imagePath = path.join(process.cwd(), product.imageUrl);
      console.log(`Processing ${product.name} at: ${imagePath}`);

      try {
        const embedding = await getEmbedding(imagePath, model);
        product.embedding = embedding;
        await product.save();
        console.log(`✅ Saved embedding for ${product.name}`);
      } catch (err) {
        console.error(`❌ Failed for ${product.name}: ${err.message}`);
      }
    }

    console.log("🎯 All embeddings processed");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.disconnect();
  }
};

seedEmbeddings();
