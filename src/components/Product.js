import Image from "next/image";
import React, { useEffect, useState } from "react";
import { StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import Currency from "react-currency-formatter";
const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating, setRating] = useState(1);
  const [freeShipping, setFreeShipping] = useState(true);
  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setFreeShipping(Math.random() < 0.5);
  }, []);

  return (
    <div className="relative flex flex-col m-5 bg-white p-10 z-30">
      <p className="absolute top-2 right-2 text-xs text-gray-600 uppercase ">
        {category}
      </p>
      <Image
        className="object-contain"
        src={image}
        width={200}
        height={200}
        alt="product image"
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="my-2 text-xs line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="USD" />

        {freeShipping && (
          <div className="flex items-center space-x-1 text-purple-500">
            <p className="font-bold">Free</p>
            <div className="w-6">
              <TruckIcon />
            </div>
          </div>
        )}
      </div>
      <button className="add-button mt-auto">Add to Cart</button>
    </div>
  );
}

export default Product;
