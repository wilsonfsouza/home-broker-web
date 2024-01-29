"use client"

import { createOrder } from "@/api/actions/create-order"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { formSchema } from "./form-schema"

export type OrderType = "BUY" | "SELL"

interface OrderFormProps {
  assetId: string
  walletId: string
  type: OrderType
}

export function OrderForm({ assetId, walletId, type }: OrderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      asset_id: assetId, 
      wallet_id: walletId,
      type,
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    createOrder(data)
  }

  const isButtonDisabled = 
    form.formState.isSubmitting || 
    !form.formState.isDirty ||
    !form.formState.isValid 
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Order Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="asset_id"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wallet_id"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="shares"
                  render={({field}) => (
                    <FormItem className="relative">
                      <FormLabel >Amount <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          className="h-11"
                          type="number" 
                          min={1} 
                          placeholder="10" 
                          {...form.register("shares", {
                          valueAsNumber: true,
                          min: 1,
                          required: true,
                        })} />
                      </FormControl>

                      <FormMessage className="absolute bottom-[-18px] text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({field}) => (
                    <FormItem className="relative">
                      <FormLabel>Price (USD) <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <div 
                          className="group flex items-center justify-center h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        >
                          <DollarSign className={cn(
                            "h-4 w-4 text-muted-foreground group-focus-within:text-foreground",
                            field.value > 1 && "text-foreground"
                          )} />
                          <Input 
                            hasParentFocusWithin
                            className="px-0 border-none"
                            type="number" 
                            min={1}  
                            placeholder="10" 
                            {...form.register("price", {
                            valueAsNumber: true,
                            min: 1,
                            required: true,
                          })}/>
                        </div>
                      </FormControl>
                      
                      <FormMessage className="absolute bottom-[-18px] text-xs" />
                    </FormItem>
                  )}
                />
              </div>

            <Button disabled={isButtonDisabled} className="w-full mt-8" type="submit">Trade</Button>
          </form>
        </Form>
      </CardContent>
      
    </Card>
  )
}