import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

export default function ProductPage() {
  const [products, setProducts] = useState(null);
  const router = useRouter();
  const { productSlug } = router.query;
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [freeShipping, setFreeShipping] = useState(true);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setFreeShipping(Math.random() < 0.5);
  }, []);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("products");

    if (sessionData) setProducts(JSON.parse(sessionData));
  }, []);

  function matchProductSlug() {
    const product = products?.find((product) => {
      return product.metadata.slug === productSlug;
    });

    return product || "1";
  }

  const matchedProduct = products ? matchProductSlug() : "";
  const { id, name, default_price, description, metadata, images } =
    matchedProduct;
  const image = images && images[0];

  const product = {
    id,
    title: name,
    price: default_price?.unit_amount / 100,
    description,
    category: metadata?.category,
    image,
    rating,
    freeShipping,
  };

  const addItemToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="">
      <Header />
      <div className="max-w-screen-xl mx-auto">
        <div className="relative flex flex-col m-5 bg-white p-10 z-30">
          <p className="absolute top-2 right-2 text-xs text-gray-600 uppercase">
            {metadata?.category}
          </p>
          {images && (
            <Image
              className="object-contain place-self-center"
              src={image}
              width={600}
              height={600}
              alt="product image"
            />
          )}
          <h4 className="my-3">{name}</h4>
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
            }).format(default_price?.unit_amount / 100)}

            {freeShipping && (
              <div className="flex items-center space-x-4 text-purple-500">
                <TruckIcon className="w-7" />
                <p className="font-bold">Free Shipppng</p>
              </div>
            )}
          </div>
          <button
            onClick={addItemToCart}
            className="add-button m-auto mt-10 w-[50%]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
