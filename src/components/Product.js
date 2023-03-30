import Image from "next/image";
import React, { useEffect, useState } from "react";
import { StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [freeShipping, setFreeShipping] = useState(true);
  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setFreeShipping(Math.random() < 0.5);
  }, []);

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      freeShipping,
    };

    dispatch(addToCart(product));
  };

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
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="my-2 text-xs line-clamp-2">{description}</p>

      <div className="flex justify-between mb-5">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)}

        {freeShipping && (
          <div className="flex items-center space-x-4 text-purple-500">
            <TruckIcon className="w-7" />
            <p className="font-bold">Free Shipppng</p>
          </div>
        )}
      </div>
      <button onClick={addItemToCart} className="add-button mt-auto">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
