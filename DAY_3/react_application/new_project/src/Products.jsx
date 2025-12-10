import React, { useState, useEffect, use } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the products!', error);
        });
  }, []);
  return (
    <div>
      <h1>Products list</h1>
      {products.map(product => (
        <div key={product.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
          <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <img src={product.image} alt={product.title} style={{width: '100px'}} />    
        </div>
      ))}
    </div>
  );
}
export default Products;