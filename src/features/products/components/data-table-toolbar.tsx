import React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { BeliShopService } from '@/services/beli-shop.service'
import { Phase } from '@/services/models/beli-shop.model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sizes } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

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

  const phasesCode = React.useMemo(() => {
    return phase.map((item) => ({
      value: item.phaseCode,
      label: item.phaseName,
    }))
  }, [phase])

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('code')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('phaseCode') && (
            <DataTableFacetedFilter
              column={table.getColumn('phaseCode')}
              title='Phase'
              options={phasesCode}
            />
          )}
          {table.getColumn('size') && (
            <DataTableFacetedFilter
              column={table.getColumn('size')}
              title='Size'
              options={sizes}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
