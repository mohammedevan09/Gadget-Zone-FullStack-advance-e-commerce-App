const { createSlice } = require('@reduxjs/toolkit')

const blogSlice = createSlice({
  name: 'Blog',
  initialState: {
    blogsCategory: [],
  },
  reducers: {
    setBlogsCategory: (state, action) => {
      return { ...state, blogsCategory: action.payload }
    },
  },
})

export const { setBlogsCategory } = blogSlice.actions
export default blogSlice.reducer
