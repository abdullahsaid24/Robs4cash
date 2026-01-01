export interface QuoteFormData {
  year: string;
  make: string;
  model: string;
  condition: string;
  missingParts: string;
  name: string;
  phone: string;
  email: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  priceTag: string;
  imageUrl: string;
}