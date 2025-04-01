import { ColumnDef } from '@tanstack/react-table'
import { Product, Revenue } from '@/services/models/beli-shop.model'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Revenue>[] = [
  {
    id: 'channel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Channel' />
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
      <DataTableColumnHeader column={column} title='Phase Code' />
    ),
    cell: ({ row }) => {
      const { price } = row.original
      return <div>{price}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'sellPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sell Price' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('sellPrice')}</div>
    ),
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Revenue' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('revenue')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('amount')}</div>
    ),
  },
  {
    accessorKey: 'fees',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fees' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('fees')}</div>
    ),
  },
]
