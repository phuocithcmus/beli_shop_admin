import { ColumnDef } from '@tanstack/react-table'
import { ProductRemainingAmountDto } from '@/services/models/beli-shop.model'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<ProductRemainingAmountDto>[] = [
  {
    id: 'productCode',
    accessorKey: 'productCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Code' />
    ),
    cell: ({ row }) => {
      const { productCode } = row.original
      return <div>{productCode}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'remainingAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Con lai' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('remainingAmount')}</div>
    ),
  },
]
