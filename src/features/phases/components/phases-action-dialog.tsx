'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeliShopService } from '@/services/beli-shop.service'
import { Phase } from '@/services/models/beli-shop.model'
import { Loader2 } from 'lucide-react'
import moment from 'moment'
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
import { usePhases } from '../context/phases-context'

const formSchema = z.object({
  phaseCode: z.string().min(3),
  date: z.number(),
  phaseName: z.string(),
})
type FeeForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Phase
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PhasesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<FeeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phaseCode: undefined,
      date: undefined,
      phaseName: undefined,
    },
  })
  const { refetchPhases } = usePhases()

  const { isSubmitting } = form.formState

  const onSubmit = async (values: FeeForm) => {
    try {
      if (isEdit === true) {
        await BeliShopService.instance.updatePhase({
          ...currentRow,
          phaseCode: values.phaseCode,
          phaseName: String(values.phaseName),
        })

        toast({
          title: 'Success',
          description: 'User updated successfully.',
        })
      } else {
        await BeliShopService.instance.createPhase({
          phaseCode: values.phaseCode,
          phaseName: String(values.phaseName),
        })
        toast({
          title: 'Success',
          description: 'User created successfully.',
        })
      }
      await refetchPhases()
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

  const date = form.watch('date')

  useEffect(() => {
    if (!isEdit && date) {
      const date_nhap = moment(date).format('DD-MM-yyyy-HH-mm-ss')

      form.setValue('phaseCode', date_nhap)
    }
  }, [date])

  useEffect(() => {
    if (isEdit === true && currentRow) {
      form.setValue('phaseCode', currentRow.phaseCode)
      form.setValue('date', currentRow.createdAt)
      form.setValue('phaseName', currentRow.phaseName)
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
          <DialogTitle>{isEdit ? 'Edit User' : 'Tao dot'}</DialogTitle>
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
                name='phaseCode'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Ma dot
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder='Phase Code auto generated'
                        className='col-span-4'
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Ngay nhap
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={'outline'} className='col-span-4'>
                            {field.value ? (
                              format(field.value, 'dd-MM-yyyy')
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
                name='phaseName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Ten dot
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhap ten cua dot'
                        className='col-span-4'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name='phaseName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Phase Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=' Name (DD-MM-YYYY)'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              /> */}
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
