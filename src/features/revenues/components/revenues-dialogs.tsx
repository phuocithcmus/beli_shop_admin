import { useRevenues } from '../context/revenues-context'
import { PhasesActionDialog } from './revenues-action-dialog'

export function RevenuesDialogs() {
  const { currentRow, open, setCurrentRow, setOpen } = useRevenues()
  return (
    <>
      <PhasesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
    </>
  )
}
