import dbConnection from "../utils/dbConnection";
import Order from "../dbModels/order";

export default async function getOrders(session) {
  const { email } = session?.user;
  try {
    dbConnection();
    const order = await Order.find({ customerEmail: email });
    return order;
  } catch (error) {
    console.log("DATABASE ERROR :", error.message);
  }
}
