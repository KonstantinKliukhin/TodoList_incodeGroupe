import { storageRepoService } from "../service";
import debounce from "./../utils/debounce";
import getPreloadState from "./preloadState";
import { reducer as repos } from "./slices/reposSlice";
import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  repos,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    middleware: (gDM) => gDM({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer,
    preloadedState: preloadedState,
  });
}

const preloadedState = getPreloadState();

export const store = setupStore(preloadedState);

store.subscribe(
  debounce<[], () => void>(() => {
    storageRepoService.saveRepo(store.getState().repos.repos);
  }, 800)
);

export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
