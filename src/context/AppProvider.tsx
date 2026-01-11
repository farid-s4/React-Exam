import AuthContext from "./AppContext";
import type { User, CardType, BasketItem, FavoriteItem } from "../type/types";
import React, { useEffect, useState } from "react";
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultProducts: CardType[] = [
    {
      id: 1,
      title: "Performance Turbo",
      price: "1200",
      imageUrl: "https://turboworks.co.uk/1211-large_default/volvo-bus-truck-52d-turbocharger-23526111-remanufactured-turbo-repairs-rebuilds-fitting-for-sale-turbo-shop-uk.jpg",
      userEmail: "system",
    },
    {
      id: 2,
      title: "Sport Exhaust",
      price: "850",
      imageUrl: "https://modeautoconcepts.com/cdn/shop/products/Akrapovic_BMW_F10_M5_Titanium_Evolution_Line_Exhaust_-_2.png?v=1627273927",
      userEmail: "system",
    },
    {
      id: 3,
      title: "Carbon Hood",
      price: "1500",
      imageUrl: "https://seiboncarbon.com/media/catalog/product/cache/71ca68bedc79d61dff7e04ab03c07fd5/h/d/hd15sbimp-cw_01.jpg",
      userEmail: "system",
    },
  ];

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  }, []);

  const [user, setUser] = React.useState<User | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    const key = user ? user.id : "guest";
    const all = JSON.parse(localStorage.getItem("basketItems") || "{}");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBasket(all[key] || []);
  }, [user]);
  useEffect(() => {
    const key = user ? user.id : "guest";
    const all = JSON.parse(localStorage.getItem("favoriteItems") || "{}");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(all[key] || []);
  }, [user]);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };
  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const User = { id: Date.now(), name, email, password };
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }
    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long",
      };
    }
    if (!email.includes("@")) {
      return { success: false, message: "Invalid email address" };
    }
    if (name.trim() === "") {
      return { success: false, message: "Name cannot be empty" };
    }

    if (localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find((u: User) => u.email === email);
      if (userExists) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }
      users.push(User);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem("users", JSON.stringify([User]));
    }
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const addproduct = async (
    title: string,
    price: string,
    imageUrl: string,
    userEmail: string
  ) => {
    const product: CardType = {
      id: Date.now(),
      title,
      price,
      imageUrl,
      userEmail,
    };
    if (localStorage.getItem("products")) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      localStorage.setItem("products", JSON.stringify([product]));
    }
    return true;
  };

  const getProducts = (): CardType[] => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    return products;
  };
  const deleteproduct = async (id: number) => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const filteredProducts = products.filter((p: CardType) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    return true;
  };
  const addToBasket = async (product: CardType, user: User | null) => {
    const key = user ? user.id : "guest";

    const all = JSON.parse(localStorage.getItem("basketItems") || "{}");
    const basket: BasketItem[] = all[key] || [];

    const existing = basket.find((i) => i.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      basket.push({ product, quantity: 1 });
    }

    all[key] = basket;
    localStorage.setItem("basketItems", JSON.stringify(all));
    setBasket(basket);
    return true;
  };

  const deleteFromBasket = async (productId: number) => {
    const key = user ? user.id : "guest";
    const all = JSON.parse(localStorage.getItem("basketItems") || "{}");
    let basket = all[key] || [];
    basket = basket.filter(
      (i: { product: CardType; quantity: number }) => i.product.id !== productId
    );
    all[key] = basket;
    localStorage.setItem("basketItems", JSON.stringify(all));
    setBasket(basket);
    return true;
  };

  const addToFavorite = async (product: CardType, user: User) => {
    const key = user.id;

    const all = JSON.parse(localStorage.getItem("favoriteItems") || "{}");
    const favorites: FavoriteItem[] = all[key] || [];
    const existing = favorites.find((i) => i.product.id === product.id);
    if (existing) {
      return false;
    } else {
      favorites.push({ user, product });
    }
    all[key] = favorites;
    localStorage.setItem("favoriteItems", JSON.stringify(all));
    setFavorites(favorites);
    return true;
  };

  const deleteFromFavorite = async (productId: number) => {
    const key = user ? user.id : "guest";
    const all = JSON.parse(localStorage.getItem("favoriteItems") || "{}");
    let favorites = all[key] || [];
    favorites = favorites.filter(
      (i: { product: CardType; user: User }) => i.product.id !== productId
    );
    all[key] = favorites;
    localStorage.setItem("favoriteItems", JSON.stringify(all));
    setFavorites(favorites);
    return true;
  };

  const getProductById = async (id: number): Promise<CardType | null> => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const product = products.find((p: CardType) => p.id === id);
    return product || null;
  };
  const updateproduct = async (
    id: number,
    title: string,
    price: string,
    imageUrl: string
  ) => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const productIndex = products.findIndex((p: CardType) => p.id === id);
    if (productIndex === -1) {
      return false;
    }
    products[productIndex] = {
      ...products[productIndex],
      title,
      price,
      imageUrl,
    };
    localStorage.setItem("products", JSON.stringify(products));
    return true;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        basket: basket,
        favorites: favorites,
        login,
        register,
        logout,
        addproduct,
        getProducts,
        deleteproduct,
        addToBasket,
        deleteFromBasket,
        addToFavorite,
        deleteFromFavorite,
        getProductById,
        updateproduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
