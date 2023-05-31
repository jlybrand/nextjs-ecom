const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { cartItems, email } = req.body;

  const transformedItems = cartItems.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "USD",
      unit_amount: Math.ceil(item.price * 100),
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(cartItems.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
