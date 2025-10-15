import React, { useEffect, useState } from 'react';

function SimilarProducts({ productId }) {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    if (!productId) return;

    fetch(`http://localhost:5000/products/similar/${productId}`)
      .then(res => res.json())
      .then(data => setSimilar(data.similarProducts));
  }, [productId]);

  return (
    <div>
      <h2>Similar Products</h2>
      {similar.map(name => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}

export default SimilarProducts;
