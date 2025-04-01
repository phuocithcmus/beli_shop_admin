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
  phaseCode: string
  entryDate: number
  amount: number
  transferFee: number
  remainingAmount: number
  createdAt: number
  updatedAt: number
  size: string
  color: string
}

export interface Revenue {
  id: string
  channel: string
  price: number
  sellPrice: number
  revenue: number
  productId: string
  amount: number
  createdAt: number
  updatedAt: number
  fees: string
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
  entryDate: number
  amount: number
  transferFee: number
  size: string
  color: string
}

export interface CreateRevenueDto {
  channel: string
  price: number
  sellPrice: number
  revenue: number
  productId: string
  amount: number
  fees: string
}
