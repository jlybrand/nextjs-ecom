import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Next.js Store</title>
        <meta name="description" content="e-commerce store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
      </main>
    </div>
  );
}
