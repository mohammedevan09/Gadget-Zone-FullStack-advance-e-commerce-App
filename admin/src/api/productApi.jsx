import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllProduct = async (queryParams) => {
  const data = await axios.get(`${HOST}/api/product`, { params: queryParams })

  return data?.data
}

export const createProduct = async (params, token) => {
  const data = await axios.post(`${HOST}/api/product`, params, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}

export const uploadProductImage = async (id, formData, token, forDelete) => {
  let url = `${HOST}/api/product/upload/${id}`

  // if (forDelete) {
  //   const forDeleteString = (url += `?forDelete=${forDelete}`)
  // }

  const data = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}
