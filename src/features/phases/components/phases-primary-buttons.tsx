import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { usePhases } from '../context/phases-context'

export function PhasesPrimaryButtons() {
  const { setOpen } = usePhases()

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tao Dot</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
