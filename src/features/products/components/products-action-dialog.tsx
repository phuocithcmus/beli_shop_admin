'use client'

import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductColor,
  ProductFormType,
  ProductSize,
  ProductType,
} from '@/constants'
import { BeliShopService } from '@/services/beli-shop.service'
import { Fee, Phase } from '@/services/models/beli-shop.model'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { useProducts } from '../context/products-context'

const formSchema = z.object({
  code: z.string().min(3),
  phaseCode: z.string().min(3),
  productType: z.string().min(3),
  formType: z.string().min(3),
  amount: z.number(),
  transferFee: z.number(),
  entryDate: z.number(),
  remainingAmount: z.number(),
  size: z.string(),
  color: z.string(),
})
type ProductForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Fee
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PhasesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const [phases, setPhases] = useState<Phase[]>([])

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: undefined,
      phaseCode: undefined,
      productType: undefined,
      formType: undefined,
      amount: undefined,
      transferFee: undefined,
      entryDate: undefined,
      remainingAmount: undefined,
    },
  })
  const { refetchProducts } = useProducts()

  const { isSubmitting } = form.formState

  const onSubmit = async (values: ProductForm) => {
    try {
      console.log('values', values)
      if (isEdit === true) {
        toast({
          title: 'Success',
          description: 'Product updated successfully.',
        })
      } else {
        await BeliShopService.instance.createProduct({
          ...values,
          entryDate: values.entryDate / 1000,
        })
        toast({
          title: 'Success',
          description: 'Product created successfully.',
        })

        await refetchProducts()
      }
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
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  const fetchPhases = async () => {
    const fees = await BeliShopService.instance.getPhase()
    setPhases(fees)
  }

  useEffect(() => {
    fetchPhases()
  }, [])

  const PhaseOptions = useMemo(() => {
    return phases.map((phase) => ({
      label: phase.phaseName,
      value: phase.phaseCode,
    }))
  }, [phases])

  const ProductTypeOptions = [
    { label: 'Shirt', value: ProductType.Shirt },
    { label: 'Pants', value: ProductType.Pants },
  ]

  const ProductFormTypeOptions = [
    { label: 'Oversize', value: ProductFormType.Oversize },
    { label: 'Regular', value: ProductFormType.Regular },
  ]

  const ProductSizeOptions = [
    { label: 'S', value: ProductSize.S },
    { label: 'M', value: ProductSize.M },
    { label: 'L', value: ProductSize.L },
    { label: 'XL', value: ProductSize.XL },
  ]

  const ProductColorOptions = [
    { label: 'Trang', value: ProductColor.Trang },
    { label: 'Xanh', value: ProductColor.Xanh },
    { label: 'Do', value: ProductColor.Do },
    { label: 'Den', value: ProductColor.Den },
    { label: 'Vang', value: ProductColor.Vang },
    { label: 'Tim', value: ProductColor.Tim },
    { label: 'Hong', value: ProductColor.Hong },
    { label: 'Xam', value: ProductColor.Xam },
    { label: 'Cam', value: ProductColor.Cam },
    { label: 'Bac', value: ProductColor.Bac },
    { label: 'Xanh Duong', value: ProductColor.XanhDuong },
    { label: 'Xanh La', value: ProductColor.XanhLa },
  ]

  const productType = form.watch('productType')
  const formType = form.watch('formType')
  const size = form.watch('size')
  const color = form.watch('color')

  useEffect(() => {
    if (!isEdit && productType && formType && size && color) {
      const formatCode = `${formType}_${color}_${productType}_${size}`
      form.setValue('code', formatCode)
    }
  }, [productType, formType, size, color])

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
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New Products'}</DialogTitle>
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
                name='code'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder='Code auto generated'
                        className='col-span-4'
                        {...field}
                        value={field.value}
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
                    <FormLabel className='col-span-2 text-right'>
                      Phase Code
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select phase code'
                        className='col-span-4'
                        items={PhaseOptions.map(({ label, value }) => ({
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
                name='entryDate'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Date of birth
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={'outline'} className='col-span-4'>
                            {field.value ? (
                              format(field.value, 'MMM d, yyyy')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={(evt) => {
                              evt && field.onChange(evt.getTime())
                            }}
                            disabled={(date: Date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='productType'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Product Type
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select product type'
                        className='col-span-4'
                        items={ProductTypeOptions.map(({ label, value }) => ({
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
                name='formType'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Product Form Type
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select product form type'
                        className='col-span-4'
                        items={ProductFormTypeOptions.map(
                          ({ label, value }) => ({
                            label,
                            value,
                          })
                        )}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Product Size
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select size'
                        className='col-span-4'
                        items={ProductSizeOptions.map(({ label, value }) => ({
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
                name='color'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Product Color
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select color'
                        className='col-span-4'
                        items={ProductColorOptions.map(({ label, value }) => ({
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
                name='amount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter amount'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='transferFee'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Transfer Fee
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter transfer fee'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='remainingAmount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Remaining Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter remaining amount'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
