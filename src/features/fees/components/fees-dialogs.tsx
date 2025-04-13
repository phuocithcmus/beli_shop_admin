import { useFees } from '../context/fees-context'
import { FeesActionDialog } from './fees-action-dialog'

export function FeesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFees()
  return (
    <>
      <FeesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      <FeesActionDialog
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
