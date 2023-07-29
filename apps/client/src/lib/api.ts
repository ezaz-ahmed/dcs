
import axios from 'axios'
import { PUBLIC_URL } from "$env/static/public"
import type { DonationHistory, LoginInputType, PaginationResponse, PaymentIntentReponse, SignUpInputType } from './types'
import { isAuthenticated, token } from './stores/TokenStore'
import { get } from 'svelte/store'

export const axi = axios.create({
  baseURL: PUBLIC_URL,
  withCredentials: true
})

const axiosApiInstance = axios.create({
  baseURL: PUBLIC_URL,
  withCredentials: true
})

axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = get(token)

    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  })

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest.sent) {
    originalRequest.sent = true
    const access_token = await getNewAccessToken()

    originalRequest.headers['Authorization'] = 'Bearer ' + access_token

    return axiosApiInstance(originalRequest)
  }
  return Promise.reject(error)
})

export const signup = async (data: SignUpInputType) => {
  let result = '', error = ''

  try {
    const response = await axi.post('/auth/signup', data)

    token.update(() => response.data.access_token)
    isAuthenticated.update(() => true)

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

export const login = async (data: LoginInputType) => {
  let result = '', error = ''

  try {
    const response = await axi.post('/auth/signin', data)

    token.update(() => response.data.access_token)
    isAuthenticated.update(() => true)

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

export const logout = async () => {
  let result = '', error = ''

  try {
    const accessToken = get(token)

    if (!accessToken) {
      error = 'Access token not found.'

      return {
        result,
        error
      }
    }

    const response = await axiosApiInstance.get("/auth/logout")

    if (response.status === 200) {
      token.update(() => '')
      isAuthenticated.update(() => false)
      result = 'ok'
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.message
    }
  }

  return {
    result, error
  }
}

export const getNewAccessToken = async () => {
  try {
    const response = await axi('/auth/refresh')

    if (response.status === 200) {
      return response.data.access_token
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    }
  }
}

export const donationIntent = async (body: {
  amount: number,
  currency: string,
  description?: string
}): Promise<PaymentIntentReponse> => {

  let error = ''

  try {
    const response = await axiosApiInstance.post('/donation', body)

    return {
      status: response.status,
      result: response.data
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.message
    }

    return {
      status: 400,
      error
    }
  }
}


export const donationList = async (page: number, limit: number) => {
  let result: PaginationResponse<DonationHistory>, error = ''

  try {
    const accessToken = get(token)

    if (!accessToken) {
      error = 'Access token not found.'

      return {
        error
      }
    }

    const response = await axiosApiInstance.get<PaginationResponse<DonationHistory>>(`/donation/filter?page=${page}&limit=${limit}`)

    result = response.data
    return {
      result: response.data
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.message
    }

    return {
      error
    }
  }
}


export const statusChange = async (id: number) => {
  let error = ''

  try {
    const accessToken = get(token)

    if (!accessToken) {
      error = 'Access token not found.'

      return {
        error
      }
    }

    await axiosApiInstance.get(`/donation/${id}`)

    return {
      result: 'ok'
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.message
    }

    return {
      error
    }
  }
}
