import React, { useCallback, useEffect, useState } from 'react'
import { BeliShopService } from '@/services/beli-shop.service'
import { Phase } from '@/services/models/beli-shop.model'
import useDialogState from '@/hooks/use-dialog-state'

type PhasesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface PhasesContextType {
  open: PhasesDialogType | null
  setOpen: (str: PhasesDialogType | null) => void
  currentRow: Phase | undefined
  setCurrentRow: React.Dispatch<React.SetStateAction<Phase | undefined>>
  phases: Phase[]
  refetchPhases: () => Promise<void>
}

const PhasesContext = React.createContext<PhasesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function PhasesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PhasesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Phase | undefined>()

  const [phases, setPhases] = useState<Phase[]>([])

  const fetchFees = async () => {
    const fees = await BeliShopService.instance.getPhase()
    setPhases(fees)
  }

  useEffect(() => {
    fetchFees()
  }, [])

  const refetchPhases = useCallback(async () => {
    const fees = await BeliShopService.instance.getPhase()
    setPhases(fees)
  }, [])

  return (
    <PhasesContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        phases,
        refetchPhases,
      }}
    >
      {children}
    </PhasesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePhases = () => {
  const feesContext = React.useContext(PhasesContext)

  if (!feesContext) {
    throw new Error('usePhases has to be used within <PhasesContext>')
  }

  return feesContext
}
