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
import { selectTotalCartItems } from "@/app/redux/slices/cartSlice";

function Footer() {
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
    <footer>
      <div className="flex justify-center items-center bg-cool_grey-light p-2 pl-6 space-x-3 text-white text-lg">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Back to Top
        </button>
      </div>
      <div className="flex justify-between items-center bg-cool_grey px-5 py-10">
        <div className="text-white mx-2">
          <p>
            Copyright <br className="sm:hidden" /> &copy;2023 Startup Store
          </p>
        </div>

        <div className="bg-gray-400 hidden sm:flex items-center cursor-pointer">
          <div className="flex items-center bg-cool_grey p-2 pl-6 space-x-3 text-white text-sm overflow-x-auto no-scrollbar">
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
        </div>

        <div className="flex flex-col justify-start text-white text-xs whitespace-nowrap mx-10">
          <p>About</p>
          <p>Contact</p>
          <p>Privacy Notice</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
