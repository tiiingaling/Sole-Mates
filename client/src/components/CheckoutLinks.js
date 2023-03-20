import { Link } from 'react-router-dom';

const CheckoutLinks = ({total}) => {

  return (
    <div>
      <div className='category-link p-5 m-3'>
        {total > 0 ? (
          <>Total: £{total}</>
          ): (
            <>Your cart is empty</>
          )}
        </div>
        <Link to="/checkout">
        <div className='category-link border p-5 m-3 btn-primary'>
          Checkout
        </div>
        </Link>
        <Link to="/browse">
        <div className='category-link border p-5 m-3'>
          Continue Shopping
        </div>
        </Link>
    </div>
  )
}

export default CheckoutLinks