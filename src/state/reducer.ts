import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, sliceName as authorizer } from "../pages/Login/Login.slice";
import { authsessionReducer, sliceName as authsession } from "../pages/Login/Login.slice.session";
import { productFileReducer, sliceName as productFile } from "../pages/ProductFile/ProductFile.slice";

const slices = combineReducers({
  [authorizer]: authReducer,
  [authsession]: authsessionReducer,
  [productFile]: productFileReducer,
});

export const combinedReducers = slices;
