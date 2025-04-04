import { createFileRoute } from '@tanstack/react-router'
import Fees from '@/features/fees'

export const Route = createFileRoute('/_authenticated/')({
  component: Fees,
})
