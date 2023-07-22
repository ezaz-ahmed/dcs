export type PaymentIntent = {
  customer: string
  amount: number
  currency: string
  metadata?: {
    description: string
  }
}