import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToLocalCart } from "@/app/redux/slices/cartSlice";

function Success() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("localCart");
  }, []);

  useEffect(() => {
    const localCartItems = localStorage.getItem("localCart");
    if (localCartItems) {
      dispatch(setToLocalCart(JSON.parse(localCartItems)));
    } else {
      dispatch(setToLocalCart([]));
    }
  }, []);

  return (
    <div className="bg-blue-200 h-screen">
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center justify-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">Order Placed</h1>
          </div>
          <p>
            Thank you for shopping with us! You will receive a confirmation
            email once your order has shipped. To check the status of your
            order, please click the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="add-button mt-8"
          >
            Go to My Orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
