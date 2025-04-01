import React, { useCallback, useEffect, useState } from 'react'
import { BeliShopService } from '@/services/beli-shop.service'
import { Fee } from '@/services/models/beli-shop.model'
import useDialogState from '@/hooks/use-dialog-state'

type FeesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface FeesContextType {
  open: FeesDialogType | null
  setOpen: (str: FeesDialogType | null) => void
  currentRow: Fee | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Fee | null>>
  fees: Fee[]
  refetchFees: () => Promise<void>
}

const FeesContext = React.createContext<FeesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function FeesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<FeesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Fee | null>(null)

  const [fees, setFees] = useState<Fee[]>([])

  const fetchFees = async () => {
    const fees = await BeliShopService.instance.getFees()
    setFees(fees)
  }

  useEffect(() => {
    fetchFees()
  }, [])

  const refetchFees = useCallback(async () => {
    const fees = await BeliShopService.instance.getFees()
    setFees(fees)
  }, [])

  return (
    <FeesContext
      value={{ open, setOpen, currentRow, setCurrentRow, fees, refetchFees }}
    >
      {children}
    </FeesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFees = () => {
  const feesContext = React.useContext(FeesContext)

  if (!feesContext) {
    throw new Error('useFees has to be used within <UsersContext>')
  }

  return feesContext
}
