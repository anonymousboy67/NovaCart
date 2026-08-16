export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // phosphor-icons/react icon name
  image?: string; // category image URL
  productCount: number;
  description: string;
  subcategories: Subcategory[];
}

export interface Review {
  id: string;
  author: string;
  avatarSeed: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brand: string;
  categoryId: string;
  subcategoryId?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  images: string[];
  specs: ProductSpec[];
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus =
  | "processing"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  address: Address;
  paymentMethod: string;
  eta?: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  name: string;
  email: string;
  avatarSeed: string;
  memberSince: string;
}
