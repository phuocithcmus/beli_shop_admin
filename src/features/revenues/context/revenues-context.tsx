import React, { useCallback, useEffect, useState } from 'react'
import { BeliShopService } from '@/services/beli-shop.service'
import { Product, Revenue } from '@/services/models/beli-shop.model'
import useDialogState from '@/hooks/use-dialog-state'

type RevenuesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface RevenuesContextType {
  open: RevenuesDialogType | null
  setOpen: (str: RevenuesDialogType | null) => void
  currentRow: Revenue | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Revenue | null>>
  revenues: Revenue[]
  refetchRevenues: () => Promise<void>
}

const RevenuesContext = React.createContext<RevenuesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RevenuesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<RevenuesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Revenue | null>(null)

  const [revenues, setRevenues] = useState<Revenue[]>([])

  const fetchFees = async () => {
    const fees = await BeliShopService.instance.getRevenues()
    setRevenues(fees)
  }

  useEffect(() => {
    fetchFees()
  }, [])

  const refetchRevenues = useCallback(async () => {
    const fees = await BeliShopService.instance.getRevenues()
    setRevenues(fees)
  }, [])

  return (
    <RevenuesContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        revenues,
        refetchRevenues,
      }}
    >
      {children}
    </RevenuesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRevenues = () => {
  const feesContext = React.useContext(RevenuesContext)

  if (!feesContext) {
    throw new Error('useRevenues has to be used within <RevenuesContext>')
  }

  return feesContext
}
