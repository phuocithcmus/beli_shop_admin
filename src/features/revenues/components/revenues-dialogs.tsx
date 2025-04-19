import { useRevenues } from '../context/revenues-context'
import { RevenuesDeleteDialog } from './revenue-delete-dialog'
import { PhasesActionDialog } from './revenues-action-dialog'

export function RevenuesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRevenues()
  return (
    <>
      <PhasesActionDialog
        key='revenue-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      <PhasesActionDialog
        key='revenue-add'
        open={open === 'edit'}
        onOpenChange={() => {
          setOpen('edit')
          setTimeout(() => {
            setCurrentRow(undefined)
          }, 500)
        }}
        currentRow={currentRow}
      />

      {currentRow ? (
        <RevenuesDeleteDialog
          key={`revenue-delete-${currentRow.id}`}
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('delete')
            setTimeout(() => {
              setCurrentRow(undefined)
            }, 500)
          }}
          currentRow={currentRow}
        />
      ) : null}
    </>
  )
}
