import React from "react";
import Image from "next/image";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
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
          <div onClick={!session ? signIn : signOut} className="link">
            <p className="hover:underline">
              {session ? `Hello ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">Orders</p>
          </div>

          <div
            onClick={() => router.push("checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute right-0 top-0 h-4 w-4 bg-yellow-400 rounded-full font-bold text-black text-center">
              3
            </span>
            <ShoppingCartIcon className="w-10" />
          </div>
        </div>
      </div>
      <div className="flex items-center bg-cool_grey-light p-2 pl-6 space-x-3 text-white text-sm">
        <p className="link flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
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
