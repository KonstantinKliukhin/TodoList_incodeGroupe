import { storageRepoService } from "../service";
import debounce from "./../utils/debounce";
import getPreloadState from "./preloadState";
import { reducer as repos } from "./slices/reposSlice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

export const store = configureStore({
  middleware: (gDM) => gDM({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    repos,
  },
  preloadedState: getPreloadState(),
});

store.subscribe(
  debounce<[], () => void>(() => {
    storageRepoService.saveRepo(store.getState().repos.repos);
  }, 800)
);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
