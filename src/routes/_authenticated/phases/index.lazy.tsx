import { createLazyFileRoute } from '@tanstack/react-router'
import Phases from '@/features/phases'

export const Route = createLazyFileRoute('/_authenticated/phases/')({
  component: Phases,
})
