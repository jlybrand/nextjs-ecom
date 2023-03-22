import Header from "@/components/Header";
import CheckoutProduct from "@/components/CheckoutProduct";
import { useSelector } from "react-redux";
import { selectItems } from "@/slices/cartSlice";
import Image from "next/image";

function Checkout() {
  const items = useSelector(selectItems);

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
      </main>
    </div>
  );
}

export default Checkout;
