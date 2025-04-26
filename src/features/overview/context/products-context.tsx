import React, { useCallback, useEffect, useState } from 'react'
import { BeliShopService } from '@/services/beli-shop.service'
import {
  Fee,
  ProductRemainingAmountDto,
} from '@/services/models/beli-shop.model'
import useDialogState from '@/hooks/use-dialog-state'

type FeesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface FeesContextType {
  open: FeesDialogType | null
  setOpen: (str: FeesDialogType | null) => void
  currentRow: ProductRemainingAmountDto | undefined
  setCurrentRow: React.Dispatch<
    React.SetStateAction<ProductRemainingAmountDto | undefined>
  >
  products: ProductRemainingAmountDto[]
  refetchProducts: () => Promise<void>
}

const ProductsRemainingContext = React.createContext<FeesContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function ProductsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<FeesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<
    ProductRemainingAmountDto | undefined
  >()

  const [products, setProducts] = useState<ProductRemainingAmountDto[]>([])

  const fetchFees = async () => {
    const fees = await BeliShopService.instance.getProductRemaining()
    setProducts(fees)
  }

  useEffect(() => {
    fetchFees()
  }, [])

  const refetchProducts = useCallback(async () => {
    const fees = await BeliShopService.instance.getProductRemaining()
    setProducts(fees)
  }, [])

  return (
    <ProductsRemainingContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        refetchProducts,
        products,
      }}
    >
      {children}
    </ProductsRemainingContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductsRemaining = () => {
  const feesContext = React.useContext(ProductsRemainingContext)

  if (!feesContext) {
    throw new Error('useFees has to be used within <UsersContext>')
  }

  return feesContext
}
