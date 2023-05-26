import { configureStore, createAsyncThunk, SerializedError } from '@reduxjs/toolkit'
import memeListReducer from './memeListSlice'

export const store= configureStore({
    reducer: {
      memesSlice: memeListReducer
    }
  })

  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch