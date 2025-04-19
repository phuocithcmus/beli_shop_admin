import React from 'react'
import { Table } from '@tanstack/react-table'
import { BeliShopService } from '@/services/beli-shop.service'
import { Phase } from '@/services/models/beli-shop.model'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [phase, setPhase] = React.useState<Phase[]>([])

  React.useEffect(() => {
    ;(async () => {
      const response = await BeliShopService.instance.getPhase()
      setPhase(response)
    })()
  }, [table])

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={
            (table.getColumn('productCode')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('productCode')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
      </div>
    </div>
  )
}
