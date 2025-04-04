import { ColumnDef } from '@tanstack/react-table'
import { Fee } from '@/services/models/beli-shop.model'
import { formatNumber } from '@/lib/utils'
import LongText from '@/components/long-text'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Fee>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   meta: {
  //     className: cn(
  //       'sticky md:table-cell left-0 z-10 rounded-tl',
  //       'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
  //     ),
  //   },
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    id: 'feePlatform',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kenh ban' />
    ),
    cell: ({ row }) => {
      const { feePlatform } = row.original
      return <div>{feePlatform}</div>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'feeType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Loai' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('feeType')}</div>
    ),
  },
  {
    accessorKey: 'feeAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tong phi' />
    ),
    cell: ({ row }) => <div>{formatNumber(row.getValue('feeAmount'))}</div>,
    enableSorting: false,
  },
  // {
  //   id: 'actions',
  //   cell: DataTableRowActions,
  // },
]
