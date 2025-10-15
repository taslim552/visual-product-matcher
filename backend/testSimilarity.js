import { findSimilarProducts } from './controllers/similarityController.js';

const runSearch = async () => {
  const productId = "68ef815aa4b110475380fea0"; // your actual product _id
 // Replace with an actual MongoDB _id
  const topProducts = await findSimilarProducts(productId, 5);

  console.log("Top similar products:");
  topProducts.forEach(prod => console.log(prod.name));
};

runSearch();
