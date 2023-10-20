import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllProduct = async (queryParams) => {
  const data = await axios.get(`${HOST}/api/product`, { params: queryParams })

  return data?.data
}

export const getOneProduct = async (id) => {
  const data = await axios.get(`${HOST}/api/product/${id}`)

  return data?.data
}

export const addToWishList = async (params, token, handleRefreshToken) => {
  try {
    const data = await axios.put(`${HOST}/api/product/wishlist`, params, {
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

export const giveRatings = async (params, token, handleRefreshToken) => {
  try {
    const data = await axios.put(`${HOST}/api/product/rating`, params, {
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

export const getWishlist = async (id) => {
  const data = await axios.get(`${HOST}/api/user/wishlist/${id}`)

  return data?.data
}
