import { StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/slices/cartSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  freeShipping,
}) {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      freeShipping,
    };

    dispatch(addToCart(product));
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="grid grid-cols-5 px-10">
      <Image
        className="object-contain"
        src={image}
        height={200}
        width={200}
        alt="product image"
      />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
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

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToCart} className="add-button">
          Add to Cart
        </button>
        <button onClick={removeItemFromCart} className="add-button">
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
