import axios from "axios"
import type { LoginInputType } from "./adminTypes"
import { PUBLIC_URL } from "$env/static/public"
import { adminAuthenticated, adminToken } from "./stores/AdminInfo"

export const axi = axios.create({
  baseURL: PUBLIC_URL,
  withCredentials: true
})

export const login = async (data: LoginInputType) => {
  let result = '', error = ''

  try {
    const response = await axi.post('/admin/login', data)

    adminToken.update(() => response.data.access_token)
    adminAuthenticated.update(() => true)

    result = 'ok'
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.message
    }
  }

  return {
    result, error
  }
}
