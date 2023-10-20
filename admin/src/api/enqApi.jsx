import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST
const TOKEN = process.env.NEXT_PUBLIC_TOKEN

export const getAllEnq = async () => {
  const data = await axios.get(`${HOST}/api/enquiry`)

  return data?.data
}
