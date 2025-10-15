import React, { useEffect, useState } from 'react';

function ProductList({ onSelect }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products') // fixed URL
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product._id} onClick={() => onSelect(product._id)}>
          <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} width={150} />
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
