
import axios, { AxiosError } from 'axios'
import { PUBLIC_URL } from "$env/static/public"
import type { LoginInputType, SignUpInputType } from './types'

export const pick = axios.create({
  baseURL: PUBLIC_URL,
  withCredentials: true
})

const axiosApiInstance = axios.create({
  baseURL: PUBLIC_URL,
  withCredentials: true
})

axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = sessionStorage.getItem('access_token')

    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    console.log("First Time")

    return config
  },
  error => {
    Promise.reject(error)
  })

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const access_token = await getNewAccessToken()

    console.log({
      access_token
    })

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
    return axiosApiInstance(originalRequest)
  }
  return Promise.reject(error)
})

export const signup = async (data: SignUpInputType) => {
  let result = '', error = ''

  try {
    const response = await pick.post('/auth/signup', data)

    sessionStorage.setItem('access_token', response.data.access_token)

    result = 'ok'
  } catch (error) {
    const err = error as AxiosError
    error = err.response?.data
    console.log(err.response?.data)
  }

  return {
    result, error
  }
}

export const login = async (data: LoginInputType) => {
  let result = '', error = ''

  try {
    const response = await pick.post('/auth/signin', data)

    sessionStorage.setItem('access_token', response.data.access_token)

    result = 'ok'
  } catch (axiosError) {
    const err = axiosError as AxiosError
    error = err.message
  }

  return {
    result, error
  }
}

export const logout = async () => {
  let result = '', error = ''

  try {

    const accessToken = sessionStorage.getItem('access_token')

    if (!accessToken) {
      console.log('Access token not found.')
      return null
    }

    const response = await axiosApiInstance.get("/auth/logout")

    if (response.status === 200) {
      sessionStorage.removeItem('access_token')
      result = 'ok'
    }
  } catch (axiosError) {
    const err = axiosError as AxiosError
    error = err.message
  }

  console.log({
    result, error
  })

  return {
    result, error
  }
}

export const onRefresh = async () => {
  try {

    const response = await pick.get("/auth/refresh")

    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

const getNewAccessToken = async () => {
  try {
    const response = await pick.get("/auth/refresh")

    console.log("🐸🐸", response.config, response.data, response.status)

    if (response.status === 200) {
      const tokenData = response.data
      const newAccessToken = tokenData.access_token

      sessionStorage.setItem('access_token', newAccessToken)
      return newAccessToken
    }
  } catch (error) {
    console.log({ error, })
    return null
  }
}


const privatePick = async (endPoint: string, method: string) => {
  const base = axios.create({
    baseURL: PUBLIC_URL,
    withCredentials: true
  })

  const accessToken = sessionStorage.getItem('access_token')

  if (!accessToken) {
    console.log('Access token not found.')
    return null
  }

  try {
    const config = {
      headers: {
        method: method,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }



    const response = await base(endPoint, config)

    if (response.status >= 200 && response.status < 300) {
      const data = response.data
      return data
    } else if (response.status === 401) {
      const refreshToken = getCookie('jid')

      if (refreshToken) {
        const newAccessToken = await getNewAccessToken()

        config.headers.Authorization = `Bearer ${newAccessToken}`

        const retryResponse = await axios(endPoint, config)

        if (retryResponse.status >= 200 && retryResponse.status < 300) {
          const data = retryResponse.data
          console.log('Data received after token refresh:', data)
          return data
        }
      }

    }
  } catch (error) {
    console.error('Error occurred:', error)
    return null
  }
}


function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}
