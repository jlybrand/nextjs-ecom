const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  // TODO refactor for multiple items of same type once configured on front end
  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "USD",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  // TODO - remove
  // console.log(transformedItems);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
