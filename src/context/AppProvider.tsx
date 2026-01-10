import AuthContext from "./AppContext";
import type { User, CardType } from "../type/types";
import React, { useEffect, useState } from "react";
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
  const addtobasket = (product: CardType) => {

  };
  const deleteinBasket = (productId: number) => {
    // Implementation for deleting product from basket
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        basktet: [],
        login,
        register,
        logout,
        addproduct,
        getProducts,
        deleteproduct,
        addtobasket,
        deleteinBasket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
