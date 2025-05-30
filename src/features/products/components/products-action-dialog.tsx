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
import { Phase, Product } from '@/services/models/beli-shop.model'
import { format, unformat, useNumberFormat } from '@react-input/number-format'
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
  price: z.number(),
  size: z.string(),
  color: z.string(),
})
type ProductForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PhasesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const [phases, setPhases] = useState<Phase[]>([])

  const inputRef = useNumberFormat({
    locales: 'en',
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
    },
  })

  const { refetchProducts } = useProducts()

  const { isSubmitting } = form.formState

  console.log('values', form.getValues())

  const onSubmit = async (values: ProductForm) => {
    try {
      if (isEdit === true) {
        await BeliShopService.instance.updateProduct({
          ...currentRow,
          code: values.code,
          phaseCode: values.phaseCode,
          productType: values.productType,
          formType: values.formType,
          amount: values.amount,
          transferFee: values.transferFee,
          price: values.price,
          size: values.size,
          color: values.color,
        })
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
      }
      await refetchProducts()
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
    { label: 'Den', value: ProductColor.Den },
    { label: 'Kem', value: ProductColor.Kem },
    { label: 'Choco', value: ProductColor.Choco },
    { label: 'Xam', value: ProductColor.Xam },
    { label: 'Navy', value: ProductColor.Navy },
    { label: 'NauBo', value: ProductColor.NauBo },
    { label: 'NauDat', value: ProductColor.NauDat },
    { label: 'Vodau', value: ProductColor.Vodau },
    { label: 'VeChai', value: ProductColor.VeChai },
    { label: 'HongSen', value: ProductColor.HongSen },
    { label: 'XanhBien', value: ProductColor.XanhBien },
    { label: 'Do', value: ProductColor.Do },
    { label: 'XanhBich', value: ProductColor.XanhBich },
    { label: 'Cafe', value: ProductColor.Cafe },
    { label: 'Maroon', value: ProductColor.Maroon },
  ]

  const productType = form.watch('productType')
  const formType = form.watch('formType')
  const size = form.watch('size')
  const color = form.watch('color')

  useEffect(() => {
    if (productType && formType && size && color) {
      const formatCode = `${formType}_${color}_${productType}_${size}`
      form.setValue('code', formatCode)
    }
  }, [productType, formType, size, color])

  useEffect(() => {
    if (isEdit === true && currentRow) {
      form.setValue('code', currentRow.code)
      form.setValue('phaseCode', currentRow.phaseCode)
      form.setValue('productType', currentRow.productType)
      form.setValue('formType', currentRow.formType)
      form.setValue('amount', currentRow.amount)
      form.setValue('transferFee', currentRow.transferFee)
      form.setValue('price', currentRow.price)
      form.setValue('size', currentRow.size)
      form.setValue('color', currentRow.color)
    } else {
      form.reset()
    }
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
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='Nhap gia'
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
                        value={field.value}
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
                        value={field.value ? format(field.value) : undefined}
                        ref={inputRef}
                        placeholder='nhap phi van chuyen'
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
