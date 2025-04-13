import { usePhases } from '../context/phases-context'
import { PhasesActionDialog } from './phases-action-dialog'

export function FeesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePhases()
  return (
    <>
      <PhasesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <PhasesActionDialog
        currentRow={currentRow}
        key='user-edit'
        open={open === 'edit'}
        onOpenChange={() => {
          setOpen('edit')
          setTimeout(() => {
            setCurrentRow(undefined)
          }, 500)
        }}
      />
    </>
  )
}
