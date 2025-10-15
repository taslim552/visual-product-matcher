import Product from '../models/Product.js';
import path from 'path';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};

// Add a product via JSON (URL)
export const addProduct = async (req, res) => {
  try {
    const { name, category, imageUrl } = req.body;
    if (!name || !category || !imageUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = await Product.create({ name, category, imageUrl });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
};

// Add a product via file upload
export const addProductWithFile = async (req, res) => {
  try {
    const { name, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !category || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = await Product.create({ name, category, imageUrl });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("UPLOAD error:", err);
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
};
