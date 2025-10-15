import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  embedding: { type: [Number], default: [] } // store image embeddings
});

const Product = mongoose.model('Product', productSchema);

export default Product; // ✅ ES Module default export
