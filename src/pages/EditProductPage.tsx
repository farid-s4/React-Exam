import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AppContext";

function EditProductPage() {
  const { id: idString } = useParams();
  const id = idString ? parseInt(idString, 10) : undefined;
  const navigate = useNavigate();
  const { updateproduct, getProductById } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const product = await getProductById(id);
        if (product) {
          setTitle(product.title || "");
          setPrice(product.price || "");
          setImageUrl(product.imageUrl || "");
        }
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, getProductById]);

  const editElementHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      return;
    }

    const result = await updateproduct(id, title, price, imageUrl);
    if (result) {
      alert("Product updated successfully!");
      navigate("/");
    } else {
      alert("Failed to update product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-neutral-900">
        <div className="text-amber-50 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-neutral-900">
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-semibold text-center text-amber-50 mb-6">
          Edit product
        </h1>

        <form className="space-y-5" onSubmit={editElementHandler}>
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

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                flex-1 py-3 rounded-xl
                bg-neutral-700 hover:bg-neutral-600
                text-white font-semibold
                transition
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                flex-1 py-3 rounded-xl
                bg-amber-600 hover:bg-amber-500
                text-black font-semibold
                transition
                shadow-lg shadow-amber-600/30
              "
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;
