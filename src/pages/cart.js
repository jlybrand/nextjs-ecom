import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProduct from "@/components/CheckoutProduct";
import {
  addToCart,
  selectItems,
  selectTotal,
  selectTotalCartItems,
} from "@/app/redux/slices/cartSlice";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Cart() {
  const cartItems = useSelector(selectItems);
  const totalItemsQuantity = useSelector(selectTotalCartItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const localCartItems = localStorage.getItem("localCart");
    if (localCartItems) {
      dispatch(addToCart(JSON.parse(localCartItems)));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("localCart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      cartItems,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100 lg:h-screen">
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow shadow-sm">
          <Image
            className="object-contain w-full"
            src="/mt-fog.jpg"
            width={1020}
            height={250}
            alt="cart banner"
          />
          <div className="flex flex-col space-y-10 bg-white text-black">
            <h1 className="text-3xl border-b p-4">
              {totalItemsQuantity === 0
                ? "Your cart is empty."
                : "Shopping Cart"}
            </h1>
            {cartItems?.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                freeShipping={item.freeShipping}
              />
            ))}
          </div>
        </div>

        {cartItems?.length > 0 && (
          <div className="flex flex-col bg-white p-10 max-lg:shadow-md">
            <div className="whitespace-nowrap">
              <h2>
                Subtotal ({totalItemsQuantity}) items:
                <span className="font-bold pl-2">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`add-button mt-2 w-full ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {session ? "Proceed to checkout" : "Sign in to checkout"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
