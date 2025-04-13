'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeliPlatform, FeeType } from '@/constants'
import { BeliShopService } from '@/services/beli-shop.service'
import { Fee } from '@/services/models/beli-shop.model'
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
import { useFees } from '../context/fees-context'

const formSchema = z.object({
  feePlatform: z.string().min(1),
  feeType: z.string().min(1),
  feeAmount: z.number(),
})
type FeeForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Fee
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PlatformOptions = [
  { label: 'Shopee', value: BeliPlatform.Shopee },
  { label: 'Tiktok', value: BeliPlatform.Tiktok },
  { label: 'Tay', value: BeliPlatform.TAY },
]

const FeeTypeOptions = [
  { label: 'Phi van chuyen', value: FeeType.Shipping },
  { label: 'Phi quang cao', value: FeeType.Commission },
]

export function FeesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const form = useForm<FeeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feeAmount: 0,
      feePlatform: '',
      feeType: '',
    },
  })

  const inputRef = useNumberFormat({
    locales: 'en',
    maximumFractionDigits: 2,
  })

  const { refetchFees } = useFees()

  const { isSubmitting } = form.formState

  const onSubmit = async (values: FeeForm) => {
    try {
      if (isEdit === true) {
        await BeliShopService.instance.updateFee({
          ...currentRow,
          feeAmount: values.feeAmount,
          feePlatform: values.feePlatform,
          feeType: values.feeType,
        })
        toast({
          title: 'Success',
          description: 'User updated successfully.',
        })
      } else {
        await BeliShopService.instance.createFee(values)
        toast({
          title: 'Success',
          description: 'User created successfully.',
        })
      }
      await refetchFees()
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

  useEffect(() => {
    if (isEdit === true && currentRow) {
      form.setValue('feeAmount', currentRow.feeAmount)
      form.setValue('feePlatform', currentRow.feePlatform)
      form.setValue('feeType', currentRow.feeType)
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
          <DialogTitle>{isEdit ? 'Edit User' : 'Tao Phi'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
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
                name='feePlatform'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Kenh ban
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='chon kenh ban'
                        className='col-span-4'
                        items={PlatformOptions.map(({ label, value }) => ({
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
                name='feeType'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Loai phi
                    </FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Chon loai phi'
                        className='col-span-4'
                        items={FeeTypeOptions.map(({ label, value }) => ({
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
                name='feeAmount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Tong phi
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        ref={inputRef}
                        placeholder='Nhap tong phi'
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
            onClick={form.handleSubmit(onSubmit)}
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
