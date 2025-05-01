export interface ProductColor {
  color: string;
  value: string;
}

export interface ProductFeedback {
  id: number;
  name: string;
  title: string;
  rating: number;
  feedback: string;
  date: string;
}

export interface ProductRating {
  count: number;
  avg: number;
}

export interface Product {
  _id: number;
  image: string;
  providedImages: string[];
  title: string;
  rate: number;
  price: number;
  sale: number;
  providedColors: ProductColor[];
  providedSizes: string[];
  details: string;
  material: string;
  for: string;
  quantity: number;
  category: string;
  rating: ProductRating;
  feedbacks: ProductFeedback[];
}
