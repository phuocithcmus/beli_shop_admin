import { createLazyFileRoute } from '@tanstack/react-router'
import Revenues from '@/features/revenues'

export const Route = createLazyFileRoute('/_authenticated/revenues/')({
  component: Revenues,
})
