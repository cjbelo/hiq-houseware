import { createSlice, createAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { RootState } from "../../state/store";

export const userLogoutSessionAction = createAction("user/LOG_OUT_SESSION");
export const sliceName = "authsession";

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
    builder.addCase(userLogoutSessionAction, () => {
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
export const authsessionReducer = persistReducer(persistConfig, slice.reducer);
