export interface Shade {
  id: string;
  name: string;
  hex: string;
  imageSrc: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageSrc?: string;
  shades?: Shade[];
}

export interface CartItem {
  productId: string;
  productName: string;
  shadeName?: string;
  price: number;
  quantity: number;
  imageSrc?: string;
}
