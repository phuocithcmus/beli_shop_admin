'use client'

import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductColor,
  ProductFormType,
  ProductSize,
  ProductType,
} from '@/constants'
import { BeliShopService } from '@/services/beli-shop.service'
import { Fee, Phase } from '@/services/models/beli-shop.model'
import { useNumberFormat } from '@react-input/number-format'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
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
import { SelectDropdown } from '@/components/select-dropdown'
import { useProducts } from '../context/products-context'

const formSchema = z.object({
  code: z.string().min(3),
  phaseCode: z.string().min(3),
  productType: z.string().min(3),
  formType: z.string().min(3),
  amount: z.number(),
  transferFee: z.number(),
  remainingAmount: z.number(),
  price: z.number(),
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

  const inputRef = useNumberFormat({
    locales: 'en',
    maximumFractionDigits: 2,
  })

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: undefined,
      phaseCode: undefined,
      productType: undefined,
      formType: undefined,
      amount: undefined,
      transferFee: undefined,
      price: undefined,
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
          <DialogTitle>{isEdit ? 'Edit User' : 'Tao moi san pham'}</DialogTitle>
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
                      Ma san pham
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder='Tu dong tao ma san pham'
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
                      Ma dot
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Chon ma dot'
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
                name='price'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>Gia</FormLabel>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        placeholder='Nhap gia'
                        className='col-span-4'
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                        }}
                      />
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
                      Loai San pham
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Chon loai san pham'
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
                      Form San pham
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='chon form san pham'
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
                      Size
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='chon size'
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
                    <FormLabel className='col-span-2 text-right'>Mau</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='chon mau'
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
                      So luong
                    </FormLabel>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        placeholder='so luong'
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
                      Phi van chuyen
                    </FormLabel>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        placeholder='nhap phi van chuyen'
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
                      So luong con lai
                    </FormLabel>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        placeholder='nahp so luong con lai'
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
            Luu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
