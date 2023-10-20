const { createSlice } = require('@reduxjs/toolkit')

const userSlice = createSlice({
  name: 'User',
  initialState: {
    userInfo: {},
    token: null,
    cart: 0,
    total: 0,
  },
  reducers: {
    setUsers: (state, action) => {
      return { ...state, userInfo: action.payload }
    },
    setToken: (state, action) => {
      return { ...state, token: action.payload }
    },
    setCart: (state, action) => {
      return { ...state, cart: action.payload }
    },
    incCart: (state) => {
      return { ...state, cart: state?.cart + 1 }
    },
    descCart: (state) => {
      return { ...state, cart: state?.cart - 1 }
    },
    setTotal: (state, action) => {
      return { ...state, total: action.payload }
    },
    incTotal: (state, action) => {
      return { ...state, total: state?.total + action?.payload }
    },
    descTotal: (state, action) => {
      return { ...state, total: state?.total - action?.payload }
    },
  },
})

export const {
  setUsers,
  setToken,
  setCart,
  incCart,
  descCart,
  setTotal,
  incTotal,
  descTotal,
} = userSlice.actions
export default userSlice.reducer
