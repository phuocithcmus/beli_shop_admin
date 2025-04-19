export interface Fee {
  id: string
  feePlatform: string
  feeType: string
  feeAmount: number
  createdAt: number
  updatedAt: number
}

export interface Phase {
  id: string
  phaseCode: string
  phaseName: string
  createdAt: number
  updatedAt: number
}

export interface Product {
  id: string
  code: string
  productType: string
  formType: string
  phaseName: string
  phaseCode: string
  amount: number
  transferFee: number
  remainingAmount: number
  createdAt: number
  updatedAt: number
  size: string
  color: string
  price: number
}

export interface Revenue {
  id: string
  channel: string
  price: number
  sellPrice: number
  revenue: number
  amount: number
  fees: RevenueFee[]
  productId: string
  productCode: string
  createdAt: number
  updatedAt: number
  receivedAmount: number
}

export interface RevenueFee {
  type: string
  channel: string
  price: number
}

// POST
export interface CreatePhaseDto {
  phaseCode: string
  phaseName: string
}

export interface CreateFeeDto {
  feePlatform: string
  feeType: string
  feeAmount: number
}

export interface CreateProductDto {
  code: string
  productType: string
  formType: string
  phaseCode: string
  price: number
  amount: number
  transferFee: number
  size: string
  color: string
}

export interface CreateRevenueDto {
  channel: string
  price: number
  sellPrice: number
  receivedAmount: number
  productId: string
  amount: number
}

export interface UpdateRevenueDto {
  id: string
  channel: string
  price: number
  sellPrice: number
  receivedAmount: number
  productId: string
  amount: number
  fees: string
}
