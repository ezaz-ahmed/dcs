export interface PaginationResponse<T> {
  items: T[]
  totalItems: number
  totalPages: number
  currentPage: number
}