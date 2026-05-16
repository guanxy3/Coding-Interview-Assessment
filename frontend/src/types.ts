export type VariantDimension = "color" | "size";

export interface VariantOption {
  value: string;
  label: string;
  swatch?: string;
}

export interface Sku {
  id: string;
  color: string;
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  variants: Record<VariantDimension, VariantOption[]>;
  skus: Sku[];
}

export interface CartItem {
  productId: string;
  skuId: string;
  quantity: number;
}
