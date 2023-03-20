// UI Components
import React, { useEffect } from "react";
import BasketCard from '../components/BasketCard.js'
import CheckoutLinks from '../components/CheckoutLinks'

// Shopping Cart
import { useCart } from '../context/CartContext'

const Basket = () => {
  
  const { cartItems, onRemoveFromCart } = useCart()
  console.log(cartItems)

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, []);
  
  return (
    <>
    <div className="basket-page-container">
        <div className='w-screen border m-2 mt-10 p-5'>
        <h1 class="text-4xl font-extrabold dark:text-white text-center m-5" >Your Basket</h1>


          <div className='section-title'>
            {cartItems.map(product => (
              <BasketCard key={product.title} {...product} onRemoveFromCart={()=>onRemoveFromCart(product)} />
            ))}
          </div>
        </div>  
       
      </div>

      <div className='w-25 border m-2 p-5'>
          <div className='section-title'>
              Checkout Options
          </div>
          <CheckoutLinks total={total} />
        </div>
    </>
  )
}

export default Basket