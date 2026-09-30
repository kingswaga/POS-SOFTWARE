import { Product } from './product'
export interface SaleItem {
  productId: string
  quantity: number
  price: number
  product?: Product
}
export interface Sale {
  id: string
  customerId?: string
  total: number
  items: SaleItem[]
  createdAt: string
}