import { ColumnDef } from '@tanstack/react-table'
import { Revenue } from '@/services/models/beli-shop.model'
import { formatCurrency } from '@/lib/utils'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Revenue>[] = [
  {
    accessorKey: 'productCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='San pham' />
    ),
    cell: ({ row }) => {
      const { productCode } = row.original
      return <div>{productCode}</div>
    },
    meta: { className: 'w-36' },
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: 'channel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kenh ban' />
    ),
    cell: ({ row }) => {
      const { channel } = row.original
      return <div>{channel}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Gia' />
    ),
    cell: ({ row }) => {
      const { price } = row.original
      return <div>{formatCurrency(price)}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'sellPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Gia Ban' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>
        {formatCurrency(row.getValue('sellPrice'))}
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='So luong' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('amount')}</div>
    ),
  },
  {
    accessorKey: 'receivedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='tien nhan duoc' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>
        {formatCurrency(row.getValue('receivedAmount'))}
      </div>
    ),
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Loi nhuan' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>
        {formatCurrency(row.getValue('revenue'))}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
