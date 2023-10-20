import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllUser = async () => {
  const data = await axios.get(`${HOST}/api/user/all-users`)

  return data?.data
}

export const createUser = async (params) => {
  const data = await axios.post(`${HOST}/api/user/register`, params)

  return data?.data
}

export const loginUser = async (params) => {
  const data = await axios.post(`${HOST}/api/user/login`, params)

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

export const addToCart = async (params, token, handleRefreshToken) => {
  try {
    const data = await axios.post(`${HOST}/api/user/cart`, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data?.data
  } catch (error) {
    await handleRefreshToken()
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}

export const removeFromCart = async (params, token, handleRefreshToken) => {
  try {
    const data = await axios.delete(`${HOST}/api/user/cart`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: params,
    })

    return data?.data
  } catch (error) {
    await handleRefreshToken()
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}

export const getCart = async (id) => {
  try {
    const data = await axios.get(`${HOST}/api/user/cart/${id}`)

    return data?.data
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}

export const emptyCart = async (token, handleRefreshToken) => {
  try {
    const data = await axios.delete(`${HOST}/api/user/empty-cart`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data?.data
  } catch (error) {
    await handleRefreshToken()
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}
