export interface Product {
  _id: string;
  name: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  images: Array<{ url: string; alt: string; isPrimary: boolean }>;
  material?: string;
  weight?: string;
  dimensions?: string;
  careInstructions?: string;
  tags?: string[];
  ratings: { average: number; count: number };
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

export interface CartItem {
  productId: string | Product;
  quantity: number;
  addedAt?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  phone: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    images: string[];
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface GalleryItem {
  _id: string;
  type: 'photo' | 'reel';
  url: string;
  title?: string;
  description?: string;
  category?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email?: string;
    phone?: string;
    name?: string;
  };
}
