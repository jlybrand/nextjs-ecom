import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function Home({ products }) {
  useEffect(() => {
    sessionStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Starter Store</title>
        <meta name="description" content="e-commerce store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductList products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
    limit: 25,
  });

  return {
    props: {
      products: products.data,
      session,
    },
  };
}
