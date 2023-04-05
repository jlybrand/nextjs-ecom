import Product from "./Product";

function ProductList({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, name, default_price, description, metadata, images }) => (
          <Product
            key={id}
            id={id}
            title={name}
            price={default_price.unit_amount / 100}
            description={description}
            category={metadata.category}
            image={images[0]}
          />
        ))}
      <img
        className="md:col-span-full mx-auto border-gray-200 shadow-xl"
        src="/feeder-add.jpg"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, name, default_price, description, metadata, images }) => (
            <Product
              key={id}
              id={id}
              title={name}
              price={default_price.unit_amount / 100}
              description={description}
              category={metadata.category}
              image={images[0]}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, name, default_price, description, metadata, images }) => (
          <Product
            key={id}
            id={id}
            title={name}
            price={default_price.unit_amount / 100}
            description={description}
            category={metadata.category}
            image={images[0]}
          />
        ))}
    </div>
  );
}

export default ProductList;
