# Visual Product Matcher

A **MERN stack application** that allows users to find visually similar products using **image uploads** or **image URLs**. The system uses **MobileNet embeddings** to compute image similarity and returns the top matching products.

---

## Features

- Upload an image or provide an image URL to search for similar products.
- Display top similar products with similarity scores.
- REST API built with **Express** and **MongoDB** for product storage.
- Product embeddings generated using **TensorFlow.js** and **MobileNet**.
- Image uploads handled with **Multer**.
- Responsive and clean **React** frontend.

---

## Project Structure

visual-product-matcher/
├── backend/
│ ├── controllers/
│ │ ├── productController.js
│ │ └── searchController.js
│ ├── models/
│ │ └── Product.js
│ ├── routes/
│ │ └── productRoutes.js
│ ├── uploads/ # Uploaded product images
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ └── ProductSearch.js
│ │ └── api.js
│ ├── package.json
│ └── ...
└── README.md

yaml
Copy code

---

## Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
The backend runs at http://localhost:5000.

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
npm start
The frontend runs at http://localhost:3000.

API Endpoints
GET / - Test API.

GET /api/products - Fetch all products.

POST /api/products - Add product via JSON.

POST /api/products/upload - Add product via file upload.

POST /api/products/search - Search similar products using image upload or URL.

GET /api/products/similar/:id - Get products similar to a given product.

Technologies Used
Frontend: React, Axios, HTML, CSS

Backend: Node.js, Express.js

Database: MongoDB

Machine Learning: TensorFlow.js, MobileNet

File Upload: Multer

Image Processing: Canvas

Screenshots

Search results showing similar products

Deployment
This project can be deployed on Render, AWS EC2, or Vercel. Ensure MongoDB is accessible by your backend in production.

Future Enhancements
Add user authentication.

Optimize similarity search using FAISS or Annoy for large datasets.

Add category filters for refined search.

Enable real-time search suggestions.

Author
Taslim Ahmad
GitHub: https://github.com/taslim552
demo: https://visual-product-matcher-pbqi.vercel.app/
