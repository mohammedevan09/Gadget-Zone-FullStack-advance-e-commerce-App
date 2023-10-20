const { createSlice } = require('@reduxjs/toolkit')

const userSlice = createSlice({
  name: 'User',
  initialState: {
    userInfo: {},
    token: null,
  },
  reducers: {
    setUsers: (state, action) => {
      return { ...state, userInfo: action.payload }
    },
    setToken: (state, action) => {
      return { ...state, token: action.payload }
    },
  },
})

export const { setUsers, setToken } = userSlice.actions
export default userSlice.reducer
