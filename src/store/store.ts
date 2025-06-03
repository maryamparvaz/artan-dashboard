import { configureStore } from '@reduxjs/toolkit'
import contentReducer from './contentStore'

export const store = configureStore({
  reducer: {
    content: contentReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 