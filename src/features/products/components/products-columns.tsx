import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/services/models/beli-shop.model'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product Code' />
    ),
    cell: ({ row }) => {
      const { code } = row.original
      return <div>{code}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'phaseCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phase Code' />
    ),
    cell: ({ row }) => {
      const { phaseCode } = row.original
      return <div>{phaseCode}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'productType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product Type' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('productType')}</div>
    ),
  },
  {
    accessorKey: 'formType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Form Type' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('formType')}</div>
    ),
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Size' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('size')}</div>
    ),
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Color' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('color')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='amount' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('amount')}</div>
    ),
  },
  {
    accessorKey: 'remainingAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remaining Amount' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('remainingAmount')}</div>
    ),
  },
  {
    accessorKey: 'transferFee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Transfer Fee' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('transferFee')}</div>
    ),
  },
]
