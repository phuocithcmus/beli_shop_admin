'use client'

import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeliPlatform } from '@/constants'
import { BeliShopService } from '@/services/beli-shop.service'
import { Phase, Product, Revenue } from '@/services/models/beli-shop.model'
import { format, unformat, useNumberFormat } from '@react-input/number-format'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectDropdown } from '@/components/select-dropdown'
import { useRevenues } from '../context/revenues-context'

const formSchema = z.object({
  channel: z.string(),
  price: z.number(),
  sellPrice: z.number(),
  receivedAmount: z.number(),
  productId: z.string(),
  amount: z.number(),
  packageFee: z.number(),
  phaseCode: z.string().optional(),
})
type ProductForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Revenue
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PhasesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const [products, setProducts] = useState<Product[]>([])
  const [phases, setPhases] = useState<Phase[]>([])

  const inputRef = useNumberFormat({
    locales: 'en',
    maximumFractionDigits: 2,
  })

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channel: undefined,
      price: undefined,
      sellPrice: undefined,
      receivedAmount: undefined,
      productId: undefined,
      amount: undefined,
      phaseCode: undefined,
      packageFee: undefined,
    },
  })
  const { refetchRevenues } = useRevenues()

  const { isSubmitting } = form.formState

  const onSubmit = async (values: ProductForm) => {
    try {
      if (isEdit === true) {
        await BeliShopService.instance.updateRevenue({
          ...currentRow,
          ...values,
        })
        toast({
          title: 'Success',
          description: 'Revenue updated successfully.',
        })
      } else {
        await BeliShopService.instance.createRevenues(values)
        toast({
          title: 'Success',
          description: 'Revenue created successfully.',
        })
      }
      await refetchRevenues()
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong while submitting the form.',
        variant: 'destructive',
      })
      console.error(e)
      return
    }

    form.reset()
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    onOpenChange(false)
  }

  const phasesCode = form.watch('phaseCode')

  console.log('phasesCode', phasesCode)

  const fetchProducts = async (phasesCode?: string) => {
    if (!phasesCode) {
      return
    }
    const fees = await BeliShopService.instance.getProductsByPhaseId(phasesCode)
    setProducts(fees)
  }

  useEffect(() => {
    fetchProducts(phasesCode)
  }, [phasesCode])

  const fetchPhases = async () => {
    const phases = await BeliShopService.instance.getPhase()
    setPhases(phases)
  }

  useEffect(() => {
    fetchPhases()
  }, [])

  const ProductsOptions = useMemo(() => {
    return products.map((product) => ({
      label: product.code,
      value: product.id,
    }))
  }, [products])

  const PhasesOptions = useMemo(() => {
    return phases.map((phase) => ({
      label: phase.phaseName,
      value: phase.phaseCode,
    }))
  }, [phases])

  const ChannelsOptions = [
    { label: 'Shopee', value: BeliPlatform.Shopee },
    { label: 'Tiktok', value: BeliPlatform.Tiktok },
    { label: 'Tay', value: BeliPlatform.TAY },
  ]

  useEffect(() => {
    ;(async () => {
      if (isEdit === true && currentRow) {
        form.setValue('channel', currentRow.channel)
        form.setValue('price', currentRow.price)
        form.setValue('sellPrice', currentRow.sellPrice)
        form.setValue('receivedAmount', currentRow.receivedAmount)
        form.setValue('productId', currentRow.productId)
        form.setValue('amount', currentRow.amount)
        form.setValue('packageFee', currentRow.packageFee)
        const products = await BeliShopService.instance.getProducts()

        const product = products.find(
          (product) => product.id === currentRow.productId
        )

        console.log('product', product)
        if (product) {
          form.setValue('phaseCode', product.phaseCode)
        }
      } else {
        form.reset()
      }
    })()
  }, [isEdit, currentRow])

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            {isEdit ? 'Edit User' : 'Tao moi doanh thu'}
          </DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='channel'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Kenh ban
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Chon kenh ban'
                        className='col-span-4'
                        items={ChannelsOptions.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phaseCode'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>Dot</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        isControlled
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Chon dot'
                        className='col-span-4'
                        items={PhasesOptions.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='productId'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      San pham
                    </FormLabel>
                    <FormControl>
                      {/* <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='chon san pham'
                        className='col-span-4'
                        items={ProductsOptions.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      /> */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-[289px] justify-start text-left font-normal'
                          >
                            {ProductsOptions.find(
                              (option) => option.value === field.value
                            )?.label ?? 'Chon san pham'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0' align='start'>
                          <Command>
                            <CommandInput placeholder='Search' />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {ProductsOptions.map((option) => {
                                  return (
                                    <CommandItem
                                      key={option.value}
                                      onSelect={() => {
                                        form.setValue('productId', option.value)
                                      }}
                                    >
                                      {option.label}
                                    </CommandItem>
                                  )
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Gia Dang ban
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='Nhap gia'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(unformat(e.target.value)))
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sellPrice'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Gia Da Khuyen mai
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='Nhap gia ban'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(unformat(e.target.value)))
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='receivedAmount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Tien nhan duoc
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='Nhap so tien'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(unformat(e.target.value)))
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      So luong
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='Nhap so luong'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(unformat(e.target.value)))
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='packageFee'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Phi goi hang
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='Nhap phi van chuyen'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(unformat(e.target.value)))
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={isSubmitting === true}
            type='submit'
            form='user-form'
          >
            {isSubmitting === true && <Loader2 className='animate-spin' />}
            Luu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
