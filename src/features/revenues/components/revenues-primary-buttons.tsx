import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useRevenues } from '../context/revenues-context'

export function RevenuesPrimaryButtons() {
  const { setOpen } = useRevenues()

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Revenue</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
