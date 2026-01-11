import React from "react";
import type { BasketItem, CardType, FavoriteItem, User } from "../type/types";
import type { AuthResult } from "../type/types";
export interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  basket: BasketItem[];
  favorites: FavoriteItem[];
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<AuthResult>;
  addproduct: (
    title: string,
    price: string,
    imageUrl: string,
    userEmail: string
  ) => Promise<boolean>;
  deleteproduct: (id: number) => Promise<boolean>;
  updateproduct: (
    id: number,
    title: string,
    price: string,
    imageUrl: string
  ) => Promise<boolean>;
  getProductById: (id: number) => Promise<CardType | null>;
  addToBasket: (product: CardType, user: User | null) => Promise<boolean>;
  deleteFromBasket: (productId: number) => void;
  addToFavorite: (product: CardType, user: User) => Promise<boolean>;
  deleteFromFavorite: (productId: number) => Promise<boolean>;
  getProducts: () => CardType[];
  logout: () => void;
}

const AppContext = React.createContext<AppContextType>(null!);
export default AppContext;