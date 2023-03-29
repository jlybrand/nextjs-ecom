import { buffer } from "micro";
// import * as admin from "firebase-admin";
// import serviceAccount from "../../../../serviceAccountKey.json";
import Order from "../dbModels/order";
import dbConnection from "../utils/dbConnection";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

async function fulfillOrder(session) {
  // console.log("********************* fullfillOrder called ******************");
  // console.log(session);
  // console.log("
  const orderId = session.id;
  const customerName = session.customer_details.name;
  const customerEmail = session.customer_details.email;
  const images = JSON.parse(session.metadata.images);
  const totalPrice = session.amount_total / 100;

  // console.log("***************** images **********************");
  // console.log(images);
  // console.log("***************************************");

  const order = new Order({
    orderId,
    customerName,
    customerEmail,
    images,
    totalPrice,
  });

  // console.log("***************** order **********************");
  // console.log(order);
  // console.log("***************************************");

  try {
    dbConnection();
    const savedOrder = await order.save();
    console.log("***************** savedOrder **********************");
    console.log(savedOrder);
    console.log("***************************************");

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("constructEvent ERROR :", err.message);
      return res.status(400).send(`ERROR: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      //   session.id,
      //   {
      //     expand: ["line_items"],
      //   }
      // );
      // console.log("******** line_items.data ***************");
      // console.log(sessionWithLineItems.line_items.data);
      // console.log("***********************");

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook ERROR: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
