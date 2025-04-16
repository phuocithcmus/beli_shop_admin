import { useRevenues } from '../context/revenues-context'
import { RevenuesDeleteDialog } from './revenue-delete-dialog'
import { PhasesActionDialog } from './revenues-action-dialog'

export function RevenuesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRevenues()
  return (
    <>
      <PhasesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
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
