import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllCategory = async () => {
  const data = await axios.get(`${HOST}/api/category`)

  return data?.data
}
