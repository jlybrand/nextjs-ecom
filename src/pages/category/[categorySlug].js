import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FilteredProducts() {
  const [products, setProducts] = useState(null);
  const router = useRouter();
  const { categorySlug } = router.query;

  useEffect(() => {
    const sessionData = sessionStorage.getItem("products");

    if (sessionData) setProducts(JSON.parse(sessionData));
  }, []);

  function getFilteredProducts() {
    const filteredProducts = products?.filter((product) => {
      return product?.metadata?.category === categorySlug;
    });

    return filteredProducts || "";
  }

  const filteredProducts = products ? getFilteredProducts() : "";

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        {filteredProducts && <ProductList products={filteredProducts} />}
      </main>
    </div>
  );
}
