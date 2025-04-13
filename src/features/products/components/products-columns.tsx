import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/services/models/beli-shop.model'
import { formatCurrency } from '@/lib/utils'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ma san pham' />
    ),
    cell: ({ row }) => {
      const { code } = row.original
      return <div>{code}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'phaseCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ma Dot' />
    ),
    cell: ({ row }) => {
      const { phaseName } = row.original
      return <div>{phaseName}</div>
    },
    meta: { className: 'w-36', filterVariant: 'select' },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'productType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Loai san pham' />
    ),
    cell: ({ row }) => {
      const { productType } = row.original
      return <div className='w-fit text-nowrap'>{productType}</div>
    },
  },
  {
    accessorKey: 'formType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Form' />
    ),
    cell: ({ row }) => {
      const { formType } = row.original
      return <div className='w-fit text-nowrap'>{formType}</div>
    },
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Size' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('size')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mau' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('color')}</div>
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
    accessorKey: 'remainingAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='So luong con lai' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('remainingAmount')}</div>
    ),
  },
  {
    accessorKey: 'transferFee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phi van chuyen' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>
        {formatCurrency(row.getValue('transferFee'))}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Gia' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>
        {formatCurrency(row.getValue('price'))}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
