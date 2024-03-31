export interface IAuthStore {
    access: string;
    refresh: string;
    email: string;
}

export interface IProduct {
    id: string;
    images: any[];
    remote_id: string;
    brand_name: string;
    title: string;
    quantity: number;
    price: number;
    min_price: number;
    max_price: number;
}

export interface IProductsStore {
    products: IProduct[];
}