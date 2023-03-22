import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import Header from "@/components/Header";
import CheckoutProduct from "@/components/CheckoutProduct";
import { selectItems, selectTotal } from "@/slices/cartSlice";
import Image from "next/image";
import { useSession } from "next-auth/react";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  console.log("TOTAL :", total);
  const { data: session } = useSession();
  console.log("SESSION :", session);

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            className="object-contain"
            src="/mt-fog.jpg"
            width={1020}
            height={250}
            alt="cart banner"
          />
          <div className="flex flex-col space-y-10 bg-white text-black">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your cart is empty." : "Shopping Cart"}
            </h1>
            {items.map((item, i) => (
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

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <div className="whitespace-nowrap">
              <h2>
                Subtotal ({items.length}) items:
                <span className="font-bold pl-2">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`add-button mt-2 w-full ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {session ? "Proceed to checkout" : "Sign in to checkout"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
