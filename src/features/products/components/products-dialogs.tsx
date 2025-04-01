import { useProducts } from '../context/products-context'
import { PhasesActionDialog } from './products-action-dialog'

export function ProductsDialogs() {
  const { currentRow, open, setCurrentRow, setOpen } = useProducts()
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
