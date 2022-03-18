import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../../state/store";
import { userLogoutAction } from "../Login/Login.slice";

export const sliceName = "productFile";

export type DataType = {
  id: string;
  stockNumber: string;
  supplierCode: string;
  description: string;
  catCode: string;
  deptCode: string;
  markUp: null | number;
};

type SliceState = {
  data: DataType[];
};

const initialState: SliceState = {
  data: [],
};

const slice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogoutAction, () => {
      return initialState;
    });
  },
});

// Actions
export const { setData } = slice.actions;

// Selectors
export const getData = (state: RootState) => state[sliceName].data;

// Reducer persistor config
export const persistConfig = {
  key: sliceName,
  storage,
};

// Reducer (for store)
export const productFileReducer = persistReducer(persistConfig, slice.reducer);
