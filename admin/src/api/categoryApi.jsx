import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST
const TOKEN = process.env.NEXT_PUBLIC_TOKEN

export const getAllCategory = async () => {
  const data = await axios.get(`${HOST}/api/category`)

  return data?.data
}

export const createCategory = async (params, token) => {
  const data = await axios.post(`${HOST}/api/category`, params, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}

export const uploadCategoryImage = async (id, formData, token, forDelete) => {
  let url = `${HOST}/api/category/upload/${id}`

  if (forDelete) {
    url += `?forDelete=${forDelete}`
  }

  const data = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}
