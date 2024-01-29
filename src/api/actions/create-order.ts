'use server'

import { formSchema } from "@/components/order-form/form-schema"
import { revalidateTag } from "next/cache"
import { z } from "zod"

export async function createOrder({ 
  asset_id, 
  price, 
  shares, 
  type, 
  wallet_id 
}: z.infer<typeof formSchema>) {
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/orders`, {
   headers: {
     "Content-Type": "application/json"
   },
   method: "POST",
   body: JSON.stringify({
     asset_id,
     shares,
     price,
     type,
     status: "OPEN",
     Asset: {
       id: asset_id,
       symbol: "PETR4",
       price: 30
     }
   })
  })
  
  revalidateTag(`orders-wallet-${wallet_id}`)
  return await response.json()
 }