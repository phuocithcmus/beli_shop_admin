import { usePhases } from '../context/phases-context'
import { PhasesActionDialog } from './phases-action-dialog'

export function FeesDialogs() {
  const { open, setOpen } = usePhases()
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
