import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import PostReducer from "./Reducers/PostSlice";

const Store = configureStore({
	reducer: {
		posts: PostReducer,
	},
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default Store;
