import Header from "@/components/Header";
import Image from "next/image";

function Checkout() {
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
          <div className="flex flex-col space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">Cart</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
