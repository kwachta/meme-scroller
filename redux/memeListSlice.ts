import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Meme as MemeModel, MemeList } from "../models";
//import { getMemes } from "../firebase";

export type MemeListState = {
  memes: MemeModel[];
  state: "loading" | "done" | "error";
};

//TODO: Po inicjalizacji - wypełnienie danymi z Firebase'a
const initialState: MemeListState = {
  memes: [],
  state: "loading",
};

// export const fetchMemes = createAsyncThunk(
//   "memes/fetchMemes",
//   async (_, thunkAPI) => {
//     try {
//       return await getMemes();
//     } catch (err) {
//       const error = err as SerializedError;
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

export const memeListSlice = createSlice({
  name: "memeList",
  initialState: initialState,
  reducers: {
    setMemeListState: (state, action: PayloadAction<MemeList>) => {
      state.memes = action.payload.memes;
      state.state = "done";
    },
    //increment: (state) => {
    //     state.memes.grade+=1
    // },
    // decrement: (state) => {
    //     state.meme.grade-=1
    // }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchMemes.pending, (state) => {
    //     state.state = "loading";
    //   })
    //   .addCase(fetchMemes.fulfilled, (state, action) => {
    //     state.memes = action.payload.memes;
    //     state.state = "done";
    //   })
    //   .addCase(fetchMemes.rejected, (state) => {
    //     state.state = "error";
    //   });
  },
});

export default memeListSlice.reducer;
export const { setMemeListState } = memeListSlice.actions;
