import { z } from "zod";

export const formSchema = z.object({
  asset_id: z.string(),
  wallet_id: z.string(),
  type: z.enum(["BUY", "SELL"]),
  shares: z.number({
    required_error: "You need at least 1 share to perform a new transaction",
    invalid_type_error: "Amount must be a number"
  }).min(1, {
    message: "You need at least 1 share to perform a new transaction"
  }),
  price: z.number({
    required_error: "Price per stock share must be at least $1",
    invalid_type_error: "Price must be a number"
  }).min(1, {
    message: "Price per stock share must be at least $1"
  }),
})