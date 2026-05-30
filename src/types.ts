export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in KSh
  originalPrice?: number; // in KSh (original price for sale items)
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: 'New' | 'Sale' | 'Hot' | 'Trending' | 'Limited' | 'Rugged' | 'Essential' | 'Retro' | '';
  isBestSeller: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isSale: boolean;
  description: string;
  sizes: number[];
  colors: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
