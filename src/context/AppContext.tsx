import React from "react";
import type { CardType, User } from "../type/types";
import type { AuthResult } from "../type/types";
export interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  basktet: CardType[];
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
  addtobasket: (product: CardType) => void;
  deleteinBasket: (productId: number) => void;
  getProducts: () => CardType[];
  logout: () => void;
}

const AppContext = React.createContext<AppContextType>(null!);
export default AppContext;