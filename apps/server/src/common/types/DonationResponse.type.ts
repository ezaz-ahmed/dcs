export interface DonationReposne {
  id: number
  amount: number
  currency: "USD" | "EUR" | "CAD"
  date: string
  status: "complete" | "pending" | "cancelled" | "delete"
  description: string | null
}