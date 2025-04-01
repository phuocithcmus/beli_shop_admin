import { createLazyFileRoute } from '@tanstack/react-router'
import Fees from '@/features/fees'

export const Route = createLazyFileRoute('/_authenticated/fees/')({
  component: Fees,
})
