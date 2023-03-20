import { Link } from 'react-router-dom';

const BasketCard = (props) => {

        const {title, image, price, _id, onRemoveFromCart} = props; 

    return (
    <>

        <div className="card card-side bg-base-100 shadow-xl m-5">
        <figure><img src={`${image}`} alt={title} className="w-96"/></figure>
        <div className="card-body flex flex-row justify-between">
            <h2 className="card-title "><Link className='text-4xl' to={`/product/${_id}`}>{title}</Link>
            </h2>
            <div className="card-actions flex flex-col items-center justify-end">
            <div className="badge badge-outline">£{price}</div> 
            <button className="btn btn-primary" onClick={onRemoveFromCart}>Remove</button>
            </div>
        </div>
        </div>
</>
      )
}

export default BasketCard