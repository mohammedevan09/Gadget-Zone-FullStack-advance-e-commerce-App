import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllOrders = async () => {
  try {
    const data = await axios.get(`${HOST}/api/order`)

    return data?.data
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}

export const getOneOrder = async (id) => {
  try {
    const data = await axios.get(`${HOST}/api/order/${id}`)

    return data?.data
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}
