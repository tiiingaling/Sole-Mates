import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Pluralize } from "../utils/textulize";
import Header from "./HeaderFont";
import Auth from '../utils/auth';


export default function Nav() {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const { cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  return (
    <div
      className="navbar bg-base-100 z-20"
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li tabIndex={0}>
              <a className="justify-between">
                Shop Brands
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-white z-10">
                <li>
                  <Link to="/browse/brand/Adidas">Adidas</Link>
                </li>
                <li>
                  <Link to="/browse/brand/New Balance">New Balance</Link>
                </li>
                <li>
                  <Link to="/browse/brand/Nike">Nike</Link>
                </li>
                <li>
                  <Link to="/browse/brand/Timberland">Timberland</Link>
                </li>
                <li>
                  <Link to="/browse/brand/UGG">UGG</Link>
                </li>
                <li>
                  <Link to="/browse/brand/Vagabond">Vagabond</Link>
                </li>
                <li>
                  <Link to="/browse/brand/Vans">Vans</Link>
                </li>
                <li>
                  <Link to="/browse/brand/Veja">Veja</Link>
                </li>
              </ul>
            </li>

            <li tabIndex={0}>
              <a className="justify-between">
                Shop Category
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-white z-10">
                <li>
                  <Link to="/browse/Boots">Boots</Link>
                </li>
                <li>
                  <Link to="/browse/Trainers">Trainers</Link>
                </li>
                <li>
                  <Link to="/browse/Slippers">Slippers</Link>
                </li>
                <li>
                  <Link to="/browse/For%20Him">For Him</Link>
                </li>
                <li>
                  <Link to="/browse/For%20Her">For Her</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* Full sized navbar */}
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          <Header />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/browse">Browse All</Link>
          </li>

          <li tabIndex={0}>
            <a>
              Shop Brands
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-white z-10">
              <li>
                <Link to="/browse/brand/Adidas">Adidas</Link>
              </li>
              <li>
                <Link to="/browse/brand/New Balance">New Balance</Link>
              </li>
              <li>
                <Link to="/browse/brand/Nike">Nike</Link>
              </li>
              <li>
                <Link to="/browse/brand/Timberland">Timberland</Link>
              </li>
              <li>
                <Link to="/browse/brand/UGG">UGG</Link>
              </li>
              <li>
                <Link to="/browse/brand/Vagabond">Vagabond</Link>
              </li>
              <li>
                <Link to="/browse/brand/Vans">Vans</Link>
              </li>
              <li>
                <Link to="/browse/brand/Veja">Veja</Link>
              </li>
            </ul>
          </li>

          <li tabIndex={0}>
            <a>
              Shop Category
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-white z-10">
              <li>
                <Link to="/browse/Boots">Boots</Link>
              </li>
              <li>
                <Link to="/browse/Trainers">Trainers</Link>
              </li>
              <li>
                <Link to="/browse/Slippers">Slippers</Link>
              </li>
              <li>
                <Link to="/browse/For%20Him">For Him</Link>
              </li>
              <li>
                <Link to="/browse/For%20Her">For Her</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      
    <div className="navbar-end space-x-5">
      {Auth.loggedIn() ? (
          <>
           <Link className="text-sm m-2" to="/me">
              {Auth.getProfile().data.username}
            </Link>
            <button className="text-sm m-2" onClick={logout}>
              Logout
            </button>
          </>
      ) : (
        <>
        <Link className="m-2 text-sm" to="/login">
          Login
        </Link>
        |
        <Link className="m-2 text-sm" to="/signup">
          Signup
        </Link>
        </>
      )}
      
        {/* <a>
          <Link to="/login">Log In</Link>
        </a>

        <a>
          <Link to="/signup">Sign Up</Link>
        </a> */}

        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartItems.length}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">
                {" "}
                {cartItems.length}{" "}
                {Pluralize(cartItems.length, "item", "items")}
              </span>
              <span className="text-info">Subtotal: £{total} </span>
              <div className="card-actions">
                <Link to="/basket">
                  <button className="btn btn-primary btn-block">
                    View Basket
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
