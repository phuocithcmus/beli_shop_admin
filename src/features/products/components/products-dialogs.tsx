import { useProducts } from '../context/products-context'
import { PhasesActionDialog } from './products-action-dialog'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()
  return (
    <>
      <PhasesActionDialog
        key='product-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <PhasesActionDialog
        currentRow={currentRow}
        key='product-edit'
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
