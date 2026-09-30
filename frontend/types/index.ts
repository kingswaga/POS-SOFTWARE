export interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  categoryId?: string
  createdAt: string
  updatedAt: string
}

export interface Sale {
  id: string
  total: number
  createdAt: string
  updatedAt: string
  customerId?: string
  customer?: {
    name: string
    email?: string | null
    phone?: string | null
  } | null
  items?: SaleItem[]
}

export interface SaleItem {
  id: string
  productId: string
  quantity: number
  price: number
  product?: {
    name: string
    sku: string
  }
}

export type { User } from './user'
