import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllBlogs = async (queryParams) => {
  const data = await axios.get(`${HOST}/api/blog`, { params: queryParams })

  return data?.data
}

export const createBlog = async (params, token) => {
  const data = await axios.post(`${HOST}/api/blog`, params, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}

export const uploadBlogImage = async (id, formData, token, forDelete) => {
  let url = `${HOST}/api/blog/upload/${id}`

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

export const getAllBlogsCategory = async () => {
  const data = await axios.get(`${HOST}/api/blogCategory`)

  return data?.data
}

export const createBlogCategory = async (params, token) => {
  const data = await axios.post(`${HOST}/api/blogCategory`, params, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data?.data
}
