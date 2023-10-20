import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllBrands = async () => {
  const data = await axios.get(`${HOST}/api/brand`)

  return data?.data
}

export const getAllColors = async () => {
  const data = await axios.get(`${HOST}/api/color`)

  return data?.data
}
