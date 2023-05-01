import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectTotalCartItems } from "@/slices/cartSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const totalItemsQuantity = useSelector(selectTotalCartItems);
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    "feeders",
    "houses",
    "nectar",
    "cameras",
    "optics",
    "books",
  ];

  function navigateToPage(page) {
    router.push(`/category/${page.toLowerCase()}`);
  }

  return (
    <header>
      <div className="flex flex-grow items-center bg-cool_grey px-2 py-3">
        <div className="mt-2 pr-3 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
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
            <MagnifyingGlassIcon className="w-4" />
          </div>
        </div>

        <div className="flex items-center mx-6 space-x-6 text-white text-xs whitespace-nowrap">
          <div onClick={!session ? signIn : null} className="link">
            <p className="hover:underline">
              {session ? `Hello ${session.user.email}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
            <div className="hover:underline">
              {session ? (
                <button className="" onClick={signOut}>
                  Sign Out
                </button>
              ) : null}
            </div>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute right-0 top-0 h-4 w-4 bg-yellow-400 rounded-full font-bold text-black text-center">
              {totalItemsQuantity}
            </span>
            <ShoppingCartIcon className="w-10" />
          </div>
        </div>
      </div>
      <div className="flex items-center bg-cool_grey-light p-2 pl-6 space-x-3 text-white text-sm overflow-x-auto no-scrollbar">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Bars3Icon className="w-6 mr-4" />
        </button>
        <p onClick={() => router.push("/")} className="link flex items-center">
          All
        </p>
        {categories.map((category, index) => (
          <p
            key={index}
            onClick={() => navigateToPage(category)}
            className="link"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
        ))}
      </div>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } absolute w-[45%] flex flex-col flex-grow items-start px-10 text-lg text-black`}
      >
        {categories.map((category, index) => (
          <p
            key={index}
            onClick={() => navigateToPage(category)}
            className="link"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
        ))}
      </nav>
    </header>
  );
}

export default Header;
