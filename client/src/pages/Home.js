import React from "react";
import Hero from "../components/Hero";
import NewCards from "../components/newCards";

import { useQuery } from "@apollo/client";
import { QUERY_FEATURED_PRODUCTS } from "../utils/queries";

// Shopping Cart
import { useCart } from "../context/CartContext";

const Home = () => {
  const { onAddToCart } = useCart();
  const { loading, data } = useQuery(QUERY_FEATURED_PRODUCTS);

  const products = data?.products || [];
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
  const featuredProducts = shuffledProducts.slice(0, 3);

  return (
    <div>
      <Hero />
      <h1 class="text-4xl font-extrabold dark:text-white text-center mt-10 m-5">Newest Products</h1>

      <div className='section-title flex flex-wrap justify-evenly'>
        {featuredProducts.map((product) => (
          <div key={product.title}>
            <NewCards {...product} onAddToCart={() => onAddToCart(product)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
