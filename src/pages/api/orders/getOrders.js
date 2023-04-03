import dbConnection from "../utils/dbConnection";
// import handler from "../utils/handler";
import Order from "../dbModels/order";

// handler.post(getOrders);

export default async function getOrders(session) {
  console.log("*********** inside getOrders ***************");
  // console.log(req.body);
  // console.log(session);
  const { email } = session?.user;
  // console.log("here ", email);
  try {
    dbConnection();
    const order = await Order.find({ customerEmail: email });
    // res.status(200).json(order);
    console.log("************** /api/orders/getOrders *****************");
    console.log(order);
    console.log("******************************************************");
    return order;
  } catch (error) {
    console.log("DATABASE ERROR :", error.message);
    // res.status(400).json(error.message);
  }
}

// export default handler;
