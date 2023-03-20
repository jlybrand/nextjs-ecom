import Head from "next/head";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Store</title>
        <meta name="description" content="e-commerce store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
