import { createLazyFileRoute } from '@tanstack/react-router'
import Overview from '@/features/overview'

export const Route = createLazyFileRoute('/_authenticated/overview/')({
  component: Overview,
})
