import React, { useEffect } from "react";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_CATEGORY } from "../utils/queries";
import { useParams } from 'react-router-dom';

// Shopping Cart
import { useCart } from '../context/CartContext'

const CategoryBrowse = () => {
  const { onAddToCart } = useCart()
  const { categoryName } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_CATEGORY, {
    // pass URL parameter
    variables: { name: categoryName },
  });
  const products = data?.category.products || [];
  console.log(data)

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, []);

  return (
    <>
      <div className='w-75 border m-2 p-5'>
        <div className='section-title flex flex-wrap justify-center items-center'>
          {products.map(product => (
            <Card key={product.title} {...product} onAddToCart={()=>onAddToCart(product)}/>
          ))}
        </div>
      </div>  
    </>
  );
};

export default CategoryBrowse;