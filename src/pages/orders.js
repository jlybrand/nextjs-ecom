import Order from "@/components/Order";
import { getSession, useSession } from "next-auth/react";
import getOrders from "./api/orders/getOrders";

function OrdersPage({ orders }) {
  const { data: session } = useSession();

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-10">
        <h1 className="border-b border-cool_grey-light mb-2 pb-1 text-3xl">
          Your Orders
        </h1>
        {session ? (
          <h2>
            {orders?.length > 1 || orders?.length < 1
              ? `${orders?.length} Orders`
              : `${orders?.length} Order`}
          </h2>
        ) : (
          <h2>Please sign in to view your orders.</h2>
        )}
      </main>
      <div className="mt-5 space-y-4">
        {orders?.map(({ id, amount, images, items, timestamp }) => (
          <Order
            key={id}
            id={id}
            amount={amount}
            images={images}
            items={items}
            timestamp={timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);
  let orders;

  if (!session) {
    return {
      props: {},
    };
  }

  // TODO send customerEmail from session instead of entire session
  try {
    const mongoOrders = await getOrders(session);

    orders = await Promise.all(
      mongoOrders.map(async (order) => ({
        id: order.orderId,
        amount: order.totalPrice,
        images: order.images,
        timestamp: order.createdAt,
        items: (
          await stripe.checkout.sessions.listLineItems(order.orderId, {
            limit: 100,
          })
        ).data,
      }))
    );
    orders = JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log("Orders ERROR :", error.message);
  }

  return {
    props: {
      orders,
      session,
    },
  };
}
