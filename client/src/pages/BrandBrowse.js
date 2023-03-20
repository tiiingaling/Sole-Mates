import React, { useEffect } from "react";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_BRAND } from "../utils/queries";
import { useParams } from 'react-router-dom';

// Shopping Cart
import { useCart } from '../context/CartContext'

const BrandBrowse = () => {
  const { onAddToCart } = useCart()
  const { brandName } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_BRAND, {
    // pass URL parameter
    variables: { name: brandName },
  });
  const products = data?.brand.products || [];
  console.log(data)
  console.log(brandName)

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

export default BrandBrowse;