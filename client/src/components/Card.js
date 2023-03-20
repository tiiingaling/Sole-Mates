import React from 'react';
import { Link } from 'react-router-dom';

const Card = ( props ) => {
  const {title, image, price, _id, onAddToCart} = props;

  return (
    <div className="card w-96  bg-base-100 shadow-xl m-5 ">
      <Link to={`/product/${_id}`}>
        <figure>
            <div className='image-container w-full h-full'>
            <img src={`${image}`} alt={title} />
            </div>
        </figure>
      </Link>
      <div className="card-body flex flex-col justify-center items-center text-center">
        <h2 className="card-title">
          <Link to={`/product/${_id}`}>
            {title}
          </Link>
        </h2>
        <div className="card-actions flex flex-col justify-center items-center text-center">
          <div className="badge badge-outline">£{price}</div> 
          <button className="btn btn-primary " onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;
