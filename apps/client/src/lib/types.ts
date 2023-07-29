export type NotificationType = "success" | "error" | "info" | "warning"

export interface Snackbar {
  id: string
  message: string
  type: NotificationType
}

export interface SignUpInputType extends LoginInputType {
  name: string,
}

export interface LoginInputType {
  email: string,
  password: string
}

export interface PaymentIntentReponse {
  status: number,
  result?: PaymentResponseResult,
  error?: string
}

export interface PaymentResponseResult {
  secret: string,
  status: string
}

export interface LineItem {
  amount: number
  description: string
  id: string
  quantity: number
}


export interface Invoice {
  client: Client
  createdAt: string
  discount?: number
  dueDate: string
  id: string
  invoiceNumber: string
  invoiceStatus: InvoiceStatus
  issueDate: string
  lineItems?: LineItem[]
  notes?: string
  subject?: string
  terms?: string
}

export interface Client {
  clientStatus?: ClientStatus
  city?: string
  email?: string
  id: string
  name: string
  state?: string
  street?: string
  zip?: string
  invoice?: Invoice[]
}

export enum ClientStatus {
  active = 'active',
  archived = 'archived'
}

export enum InvoiceStatus {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid'
}
