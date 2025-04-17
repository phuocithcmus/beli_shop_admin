'use client'

import { IconAlertTriangle } from '@tabler/icons-react'
import { BeliShopService } from '@/services/beli-shop.service'
import { Revenue } from '@/services/models/beli-shop.model'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useRevenues } from '../context/revenues-context'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Revenue
}

export function RevenuesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const { refetchRevenues } = useRevenues()

  const handleDelete = async () => {
    await BeliShopService.instance.deleteRevenue(currentRow.id)

    await refetchRevenues()

    onOpenChange(false)
    toast({
      title: 'The following user has been deleted:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Revenue
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.productCode}</span>?
            <br />
          </p>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
