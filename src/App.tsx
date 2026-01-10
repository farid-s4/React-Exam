import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditProductPage from "./pages/EditProductPage";
import AddProductPage from "./pages/AddProductPage";
import "./App.css";
import AuthProvider from "./context/AppProvider";
import FavoritePage from "./pages/FavoritePage";
import BasketPage from "./pages/BasketPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="edit-product" element={<EditProductPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="favorite" element={<FavoritePage />} />
            <Route path="basket" element={<BasketPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
