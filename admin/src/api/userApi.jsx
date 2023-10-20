import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllUser = async () => {
  const data = await axios.get(`${HOST}/api/user/all-users`)

  return data?.data
}

export const adminLogin = async (params) => {
  const data = await axios.post(`${HOST}/api/user/admin-login`, params)

  return data?.data
}

export const handleRefresh = async (params) => {
  try {
    const response = await axios.get(`${HOST}/api/user/refresh`, {
      params,
    })

    if (response.status === 200) {
      return response.data
    } else {
      console.error('Unexpected status code:', response.status)
      return null
    }
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
