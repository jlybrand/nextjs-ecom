import { DateTime } from "luxon";

function Order({ id, amount, images, items, timestamp }) {
  const dt = DateTime.fromISO(timestamp);
  const formattedDate = dt.toLocaleString(DateTime.DATE_MED);
  const itemQuantity = items.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <div className="relative rounded-md">
      <div className="flex items-center space-x-10 mx-3 py-5 px-10 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-sm">ORDER PLACED</p>
          <p>{formattedDate}</p>
        </div>
        <div>
          <p className="font-bold text-sm">TOTAL</p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </p>
        </div>
        <p className="flex-1 text-xs whitespace-nowrap sm:text-xl self-end text-right text-blue-600">
          {itemQuantity > 1 ? `${itemQuantity} items` : `${itemQuantity} item`}
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 pr-10 truncate text-xs whitespace-nowrap">
          ORDER NUMBER {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, index) => (
            <img
              key={index}
              className="h-20 object-contain sm:h-32"
              src={image}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
