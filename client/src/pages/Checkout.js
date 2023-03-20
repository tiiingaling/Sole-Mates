import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useMutation } from "@apollo/client";
import { CHECKOUT } from "../utils/mutations";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [checkout] = useMutation(CHECKOUT);
  const [total, setTotal] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await checkout({
        variables: { amount: total },
      });

      const confirmPayment = await stripe.confirmCardPayment(
        data.checkout.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if ("error" in confirmPayment) {
        setError(confirmPayment.error.message);
        return;
      }

      if (confirmPayment.paymentIntent.status === "succeeded") {
        setPaymentConfirmed(true);
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while processing your payment.");
    }
  };

  return (
    <div className="flex flex-row">
      <div className="card-container bg-neutral-100 w-full flex-row justify-center items-center">
          <div className="flex justify-center items-center text-center">
              <div className="card w-3/12 bg-base-100 shadow-xl flex justify-center items-center mt-20 p-5">
                <p className="text-lg mb-2 underline decoration-sky-500">Total: £{total}</p>
                <div className="form-row">
                  <label htmlFor="address">Promo Code: </label>
                  <input placeholder="XXX-XXX-XXX"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id="promo-code"
                  />
                  <div className="flex justify-center ">
                    <button class="btn btn-primary m-5">Add Promo</button>
                  </div>
                </div>
              </div>
          </div>

        <div className="card-container bg-neutral-100 w-full flex justify-center items-center">
          <div className="card  w-6/12 bg-base-100 shadow-xl flex justify-center items-center m-10 p-5">
            <form onSubmit={handlePayment} className="w-full">
              <div className="form-row mb-5 ">
                <label
                  className="border-solid"
                  placeholder="hello"
                  htmlFor="name"
                >
                  Name:{" "}
                </label>
                <input
                  placeholder="John"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="name"
                />
              </div>

              <div className="form-row mb-5">
                <label htmlFor="address">Address line 1: </label>
                <input
                  placeholder="21 St Johns Close"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="address"
                />
              </div>

              <div className="form-row mb-5">
                <label htmlFor="address">Address line 2: </label>
                <input
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="address"
                />
              </div>

              <div className="form-row mb-5">
                <label htmlFor="address">City: </label>
                <input
                  placeholder="Birmingham"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="address"
                />
              </div>

              <div className="form-row mb-10">
                <label htmlFor="address">Post Code: </label>
                <input
                  placeholder="B93 0FE"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="address"
                />
              </div>

              <div className="form-row mb-5">
                <label htmlFor="card-number">Card Number:</label>
                <CardNumberElement id="card-number" />
              </div>
              <div className="form-row mb-5">
                <label htmlFor="card-expiry">Expiration Date:</label>
                <CardExpiryElement id="card-expiry" />
              </div>
              <div className="form-row mb-5">
                <label htmlFor="card-cvc">CVC:</label>
                <CardCvcElement id="card-cvc" />
              </div>

              <div className="flex justify-center items-center">
                <button class="btn btn-primary m-5">Confirm Payment</button>
              </div>
            </form>

            {error && <div className="error">{error}</div>}
            {paymentConfirmed && (
              <div className="success">Payment confirmed!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
