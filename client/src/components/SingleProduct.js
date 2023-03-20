import React from 'react';

const SingleProduct = ({ title, image, description, price, onAddToCart }) => {
  return (
    <div className="product flex flex-col justify-center items-center text-center">
      <div className='image-container w-96 h-96 flex flex-col justify-center items-center text-center'> 
        <img src={image} alt={title} />
      </div>
      <h2 className="text-4xl font-extrabold dark:text-white text-center m-5">{title}</h2>
      <p className='m-2'>{description}</p>
      <p className='m-2'>Price: £{price}</p>
      <button className="btn btn-primary m-4" onClick={onAddToCart}>
            Add to Cart
          </button>
    </div>
  );
};

export default SingleProduct;