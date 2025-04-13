import React, { useCallback, useEffect, useState } from 'react'
import { BeliShopService } from '@/services/beli-shop.service'
import { Product } from '@/services/models/beli-shop.model'
import useDialogState from '@/hooks/use-dialog-state'

type ProductsDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface ProductsContextType {
  open: ProductsDialogType | null
  setOpen: (str: ProductsDialogType | null) => void
  currentRow: Product | undefined
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | undefined>>
  products: Product[]
  refetchProducts: () => Promise<void>
}

const ProductsContext = React.createContext<ProductsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ProductsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProductsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | undefined>()

  const [products, setProducts] = useState<Product[]>([])

  const fetchFees = async () => {
    const fees = await BeliShopService.instance.getProducts()
    setProducts(fees)
  }

  useEffect(() => {
    fetchFees()
  }, [])

  const refetchProducts = useCallback(async () => {
    const fees = await BeliShopService.instance.getProducts()
    setProducts(fees)
  }, [])

  return (
    <ProductsContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        products,
        refetchProducts,
      }}
    >
      {children}
    </ProductsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const feesContext = React.useContext(ProductsContext)

  if (!feesContext) {
    throw new Error('useProducts has to be used within <ProductsContext>')
  }

  return feesContext
}
