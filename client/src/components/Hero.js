import React from 'react';
import { Link } from 'react-router-dom';
// import Header from "./HeaderFont";
import Heroheader from '../components/WhiteHeroHeader'


export default function Hero () {
    return (
<div className="hero min-h-screen mt-20" style={{ backgroundImage: `url(https://images.pexels.com/photos/345415/pexels-photo-345415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <Heroheader />
      <p className="mb-5">Welcome to Sole Mates where you can buy all your favourite brands </p>
      <Link to="/browse">
        <button className="btn btn-secondary animate-bounce">Browse All</button>
      </Link>
    </div>
  </div>
</div>

      )

}