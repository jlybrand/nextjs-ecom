import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header>
      <div className="flex flex-grow items-center bg-cool_grey px-2 py-3">
        <div className="mt-2 pr-3 flex items-center flex-grow sm:flex-grow-0">
          <Image
            className="object-contain cursor-pointer"
            src="/bird-logo.png"
            width={120}
            height={120}
            alt="bird logo"
          />
        </div>

        <div className="bg-yellow-400 hover:bg-yellow-500 hidden sm:flex flex-grow items-center h-10 rounded-md cursor-pointer">
          <input
            className="p-2 h-full w-5 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            name=""
            id=""
          />
          <div className="search-icon h-12 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center mx-6 space-x-6 text-white text-xs whitespace-nowrap">
          <div className="link">
            <p>Hello User</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">Orders</p>
          </div>

          <div className="relative link flex items-center">
            <span className="absolute right-0 top-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full font-bold text-black text-center">
              3
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="shopping-cart-icon w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-cool_grey-light p-2 pl-6 space-x-3 text-white text-sm">
        <p className="link flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          All
        </p>
        <p className="link">Shirts</p>
        <p className="link">Pants</p>
        <p className="link">Shoes</p>
        <p className="link hidden lg:inline-flex">Outer Wear</p>
        <p className="link hidden lg:inline-flex">Boating</p>
        <p className="link hidden lg:inline-flex">Hunting</p>
        <p className="link hidden lg:inline-flex">Fishing</p>
        <p className="link hidden lg:inline-flex">Camping</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
      </div>
    </header>
  );
}

export default Header;
