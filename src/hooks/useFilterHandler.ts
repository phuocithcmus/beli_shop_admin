'use client'

import { useCallback } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

export const useFilterHandler = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const pathname = location.pathname

  const handleFilterChange = useCallback(
    (
      filterName: string,
      value: string | undefined,
      options?: {
        resetPageValue?: boolean
      }
    ) => {
      const params = new URLSearchParams(window.location.search)

      if (value !== undefined) {
        params.set(filterName, value)
      } else {
        params.delete(filterName) // Delete if value is undefined
      }

      if (options?.resetPageValue) {
        params.delete('page')
      }

      const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`
      navigate({
        to: newUrl,
        replace: true,
      })
    },
    [pathname, navigate]
  )

  return handleFilterChange
}
