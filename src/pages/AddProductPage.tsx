import React from "react";
import AuthContext from "../context/AppContext";

function AddProductPage() {
  const { addproduct, user } = React.useContext(AuthContext);

  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const addElemenetHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addproduct(title, price, imageUrl, user?.email || "");
    if (result) {
      alert("Product added successfully!");
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-neutral-900">
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-semibold text-center text-amber-50 mb-6">
          Add product
        </h1>

        <form className="space-y-5" onSubmit={addElemenetHandler}>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Title</label>
            <input
              type="text"
              placeholder="Product title"
              className="
                w-full px-4 py-3 rounded-xl
                bg-neutral-800 text-white
                border border-neutral-700
                focus:outline-none focus:ring-2 focus:ring-amber-500
                transition
              "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Price</label>
            <input
              type="text"
              placeholder="Price"
              className="
                w-full px-4 py-3 rounded-xl
                bg-neutral-800 text-white
                border border-neutral-700
                focus:outline-none focus:ring-2 focus:ring-amber-500
                transition
              "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="
                w-full px-4 py-3 rounded-xl
                bg-neutral-800 text-white
                border border-neutral-700
                focus:outline-none focus:ring-2 focus:ring-amber-500
                transition
              "
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="
              w-full mt-6 py-3 rounded-xl
              bg-amber-600 hover:bg-amber-500
              text-black font-semibold
              transition
              shadow-lg shadow-amber-600/30
            "
          >
            Add product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
