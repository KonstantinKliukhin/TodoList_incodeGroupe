import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { githubApi } from "../../api";
import { IIssue, IssueType } from "../../common/types/issue";
import { Loading } from "../../common/types/loadingState";

interface ITodosState {
	user: string;
	repo: string;
  todos: IIssue[];
  loading: Loading;
}

const initialState: ITodosState = {
	user: '',
	repo: '',
  todos: [],
  loading: Loading.IDLE,
};

type FetchAllTodosArgumets = Pick<
  Parameters<typeof githubApi.getIssues>[0],
  "owner" | "repo"
>;

export const fetchAllTodos = createAsyncThunk<
  IIssue[],
  FetchAllTodosArgumets,
  {
    rejectValue: unknown;
  }
>("todos/fetchAllTodos", async ({ owner, repo }, { rejectWithValue }) => {
  try {
    return await githubApi.getIssues({
      owner,
      repo,
      state: IssueType.ALL,
    });
  } catch (e) {
    return rejectWithValue(e);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.loading = Loading.PENDING;
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = Loading.SUCCEEDED;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = Loading.FAILED;
        console.error(action);
      });
  },
});

export const { reducer } = todoSlice;
