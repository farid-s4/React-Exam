export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
}
export interface AuthResult {
    success: boolean;
    message?: string;
}
export interface CardType {
    id: number;
    title: string;
    price: string;
    imageUrl: string;
    userEmail: string;
}
export interface favoriteType {
    user: User;
    product: CardType;
}