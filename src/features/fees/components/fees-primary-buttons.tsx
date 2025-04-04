import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useFees } from '../context/fees-context'

export function FeesPrimaryButtons() {
  const { setOpen } = useFees()

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tao Phi</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
