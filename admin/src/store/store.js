'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: [],
}

const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
})

export const persistor = persistStore(store)
