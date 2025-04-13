import { ColumnDef } from '@tanstack/react-table'
import { Phase } from '@/services/models/beli-shop.model'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Phase>[] = [
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Id' />
  //   ),
  //   cell: ({ row }) => (
  //     <LongText className='max-w-30'>{row.getValue('id')}</LongText>
  //   ),
  // },
  {
    id: 'phaseCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ma dot' />
    ),
    cell: ({ row }) => {
      const { phaseCode } = row.original
      return <div>{phaseCode}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'phaseName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ten dot' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('phaseName')}</div>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
