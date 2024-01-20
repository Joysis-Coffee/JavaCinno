import {ProductModel} from "./product-model";

export interface SalesModel {
  id: number;
  transactionId: number;
  product: ProductModel;
  size: string;
  subtotal: string;
  quantity: number;
}
