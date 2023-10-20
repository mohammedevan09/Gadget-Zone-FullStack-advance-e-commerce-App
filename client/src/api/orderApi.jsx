import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getOrderByUserId = async (id) => {
  try {
    const data = await axios.get(`${HOST}/api/order/by-user-id/${id}`)

    return data?.data
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return 'Failed'
    }
  }
}
