import { createSlice, createAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../../state/store";

export const userLogoutAction = createAction("user/LOG_OUT");
export const sliceName = "auth";

type SliceState = {
  isAuthenticated: boolean;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    avatar: null | string;
  };
};

const initialState: SliceState = {
  isAuthenticated: false,
  user: {
    username: "",
    firstName: "",
    lastName: "",
    avatar: null,
  },
};

const slice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogoutAction, () => {
      return initialState;
    });
  },
});

// Actions
export const { authenticate, setUser } = slice.actions;

// Selectors
export const getIsAuthenticated = (state: RootState) => state[sliceName].isAuthenticated;
export const getUser = (state: RootState) => state[sliceName].user;

// Reducer persistor config
export const persistConfig = {
  key: sliceName,
  storage,
};

// Reducer (for store)
export const authReducer = persistReducer(persistConfig, slice.reducer);
