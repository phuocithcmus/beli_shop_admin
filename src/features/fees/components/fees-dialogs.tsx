import { useFees } from '../context/fees-context'
import { FeesActionDialog } from './fees-action-dialog'

export function FeesDialogs() {
  const { open, setOpen } = useFees()
  return (
    <>
      <FeesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
    </>
  )
}
