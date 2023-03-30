import dbConnection from "../utils/dbConnection";
import handler from "../utils/handler";
import Order from "../dbModels/order";

handler.post(getOrders);

async function getOrders(req, res) {
  const { email } = req.body.user;

  try {
    dbConnection();
    const order = await Order.find({ customerEmail: email });
    res.status(200).json(order);
    // console.log("********************** order ************************");
    // console.log(order);
    // console.log("*****************************************************");
  } catch (error) {
    console.log("DATABASE ERROR :", error.message);
    res.status(400).json(error.message);
  }
}

export default handler;
