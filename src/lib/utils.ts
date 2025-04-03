import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (
  value: string | number,
  decimals = 4,
  minimumFractionDigits = 0
) => {
  if (isNaN(+value)) {
    return ''
  }

  const formatter = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol',
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: decimals,
  })

  const formatted = formatter.format(Number(value))
  return formatted
}

export const formatNumber = (
  value: string | number,
  decimals = 4,
  minimumFractionDigits = 0
) => {
  if (isNaN(+value)) {
    return ''
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: decimals,
  })

  return formatter.format(Number(value))
}
