import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AppContext";
import type { CardType } from "../type/types";

function HomePage() {
  const { isAuthenticated, getProducts, user, deleteproduct, addToBasket, addToFavorite} =
    useContext(AuthContext);
  const [products, setProducts] = useState<CardType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
  }, [getProducts]);

  const deleteHandler = async (id: number) => {
    const result = await deleteproduct(id);
    if (result) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete product.");
    }
  };

  const addToBasketHandler = async (product: CardType) => {
    addToBasket(product, user);
  }
  const addToFavoriteHandler = async (product: CardType) => {
    const result = await addToFavorite(product, user!);
    if (!result) {
      alert("Failed to add to favorites.");
    }
    else {
      alert("Added to favorites!");
    }
  }
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="h-[65vh] bg-black/60 flex justify-end px-12 items-center">
        <div className="max-w-xl text-right">
          <h1 className="text-4xl text-amber-50 font-bold select-none">
            Welcome to ZR Performance!
          </h1>

          <p className="text-amber-200 mt-6 select-none">
            Your ultimate destination for high-quality performance car parts and
            accessories. Explore our wide range of products designed to enhance
            your vehicle's performance and style.
          </p>

          {!isAuthenticated && (
            <div className="mt-8 text-amber-300 text-xl font-semibold border border-amber-500/40 p-4 rounded-lg bg-amber-600/20 text-center">
              Login or Register to access more features!
            </div>
          )}

          {isAuthenticated && (
            <button
              className="mt-8 bg-amber-700 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-amber-600/30 transition"
              onClick={() => navigate("/add-product")}
            >
              Add product
            </button>
          )}
        </div>
      </div>

      <div className="bg-neutral-900 text-white p-10 -mt-32 relative z-10 rounded-t-3xl shadow-2xl">
        <h1 className="text-3xl text-amber-400 mb-8">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition relative"
            >
              <div className="absolute top-2 left-0 right-0 z-20 flex justify-between px-2">
                <button className="bg-amber-600/90 hover:bg-amber-500 text-white px-3 py-2 rounded-lg shadow-lg transition flex items-center gap-1">
                  <span className="text-sm" onClick={() => addToBasketHandler(p)}>Add to basket</span>
                </button>
                <button className="bg-red-600/90 hover:bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg transition flex items-center gap-1">
                  <span className="text-sm" onClick={() => addToFavoriteHandler(p)}>♥</span>
                </button>
              </div>
              {user?.email === p.userEmail && (
                <div
                  className=" p-2 rounded-lg
                 absolute bottom-2
                  right-2 flex 
                  flex-col
                   gap-2 z-20 font-semibold"
                >
                  <button
                    className="text-amber-300 hover:text-amber-100 text-sm px-3 py-1 bg-black/70 rounded hover:bg-black/90 transition"
                    onClick={() => navigate(`/edit-product/${p.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-300 text-sm px-3 py-1 bg-black/70 rounded hover:bg-black/90 transition"
                    onClick={() => deleteHandler(p.id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              <img src={p.imageUrl} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">Title: {p.title}</h2>
                <p className="text-amber-400 mt-2">Price: ${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
