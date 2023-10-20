import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const getAllBlogs = async (queryParams) => {
  const data = await axios.get(`${HOST}/api/blog`, { params: queryParams })

  return data?.data
}

export const getAllBlogsCategory = async () => {
  const data = await axios.get(`${HOST}/api/blogCategory`)

  return data?.data
}

export const getOneBlog = async (id) => {
  const data = await axios.get(`${HOST}/api/blog/${id}`)

  return data?.data
}

export const likesBlog = async (params, token, handleRefreshToken) => {
  try {
    const data = await axios.put(`${HOST}/api/blog/likes`, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data?.data
  } catch (error) {
    await handleRefreshToken()
  }
}

export const DislikesBlog = async (params, token, handleRefreshToken) => {
  try {
    const data = await axios.put(`${HOST}/api/blog/dislikes`, params, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data?.data
  } catch (error) {
    await handleRefreshToken()
  }
}
