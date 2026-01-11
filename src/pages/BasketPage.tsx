import { useContext } from "react";
import AuthContext from "../context/AppContext";

function BasketPage() {
  const { basket, deleteFromBasket } = useContext(AuthContext);

  if (basket.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-400">
        <h1 className="text-2xl">Your basket is empty</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10 ">
      <h1 className="text-3xl text-amber-400 mb-8 mt-15">Your Basket</h1>

      <div className="space-y-6">
        {basket.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center bg-neutral-800 rounded-xl p-4 shadow-lg"
          >
            <img
              src={item.product.imageUrl}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="ml-6 flex-1">
              <h2 className="text-lg font-semibold">{item.product.title}</h2>
              <p className="text-amber-400 mt-1">${item.product.price}</p>
              <p className="text-sm text-neutral-400">
                Quantity: {item.quantity}
              </p>
            </div>

            <button
              onClick={() => deleteFromBasket(item.product.id)}
              className="text-red-400 hover:text-red-300 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BasketPage;
