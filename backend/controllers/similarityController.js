import mongoose from 'mongoose';
import Product from '../models/Product.js';

// Cosine similarity function
const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
};

// Find similar products
export const findSimilarProducts = async (productId, topN = 5) => {
  await mongoose.connect("mongodb://127.0.0.1:27017/visual_product_matcher");

  const baseProduct = await Product.findById(productId);
  if (!baseProduct || !baseProduct.embedding) {
    console.log("❌ Product not found or missing embedding");
    return [];
  }

  const allProducts = await Product.find({ _id: { $ne: productId }, embedding: { $exists: true } });

  const similarities = allProducts.map(prod => ({
    product: prod,
    similarity: cosineSimilarity(baseProduct.embedding, prod.embedding)
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  mongoose.disconnect();

  return similarities.slice(0, topN).map(item => item.product);
};
