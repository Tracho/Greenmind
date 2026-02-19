
export type TypeThisProduct = {
  title: string;
  url: string
  currency:string;
  price: number | null;
  oldPrice?: null | number;
  discount?: null | number;
  discountboolean?: null | boolean;
  quantity: number;
  image: string;
  inStock: boolean | null;
  id: string;
}