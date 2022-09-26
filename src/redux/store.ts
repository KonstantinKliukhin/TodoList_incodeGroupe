import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as currentRepo } from "./slices/currentRepoSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    currentRepo,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
