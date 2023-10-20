import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllBrands = async () => {
  const data = await axios.get(`${HOST}/api/brand`)

  return data?.data
}

export const createBrand = async (params, token) => {
  const data = await axios.post(`${HOST}/api/brand`, params, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}

export const getAllColors = async () => {
  const data = await axios.get(`${HOST}/api/color`)

  return data?.data
}

export const createColor = async (params, token) => {
  const data = await axios.post(`${HOST}/api/color`, params, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}
