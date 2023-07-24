export type NotificationType = "success" | "error" | "info" | "warning"

export interface Snackbar {
  id: string
  message: string
  type: NotificationType
}