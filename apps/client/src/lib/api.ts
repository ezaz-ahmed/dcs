
import axios from 'axios'
import { PUBLIC_URL } from "$env/static/public"
import type { LoginInputType, SignUpInputType } from './types'
import { token } from './stores/TokeStore'
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

    token.set(response.data.access_token)

    result = 'ok'
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
      error = error.response?.data.message
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

    token.set(response.data.access_token)

    result = 'ok'
  } catch (axiosError) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
      error = error.response?.data.message
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
      token.set('')
      result = 'ok'
    }
  } catch (axiosError) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
      error = error.response?.data.message
    }
  }

  return {
    result, error
  }
}



const getNewAccessToken = async () => {
  try {
    const response = await axi('/auth/refresh')

    if (response.status === 200) {
      const tokenData = response.data
      const newAccessToken = tokenData.access_token

      token.set(response.data.access_token)
      return newAccessToken
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    }
  }
}

