import express from 'express';
import { getAllProducts, addProduct, addProductWithFile } from '../controllers/productController.js';
import { upload } from '../config/multerConfig.js';
import { searchProducts } from '../controllers/searchController.js';
import { findSimilarProducts } from '../controllers/similarityController.js';

const router = express.Router();

// Search products via URL or file
router.post('/search', upload.single('image'), searchProducts);

// GET all products
router.get('/', getAllProducts);

// POST product via JSON (image URL)
router.post('/', addProduct);

// POST product via file upload
router.post('/upload', upload.single('image'), addProductWithFile);

// Get similar products by ID
router.get('/similar/:id', findSimilarProducts);

export default router;
