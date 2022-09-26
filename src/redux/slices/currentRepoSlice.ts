import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { githubService } from "../../service";
import { RepoStars } from "../../common/types/repoStars";
import { IIssue, IssueType } from "../../common/types/issue";
import { Loading } from "../../common/types/loadingState";

interface ICurrentRepoState {
  owner: string;
  repo: string;
  issues: IIssue[];
  issuesLoading: Loading;
  starsNumber: number | null;
  starsNumberLoading: Loading;
}

const initialState: ICurrentRepoState = {
  owner: "",
  repo: "",
  issues: [],
  issuesLoading: Loading.IDLE,
  starsNumber: null,
  starsNumberLoading: Loading.IDLE,
};

type FetchAllIssuesArgumets = Pick<
  Parameters<typeof githubService.getAllIssues>[0],
  "owner" | "repo"
>;

export const fetchAllIssues = createAsyncThunk<
  IIssue[],
  FetchAllIssuesArgumets,
  {
    rejectValue: unknown;
  }
>(
  "currentRepo/fetchAllIssues",
  async ({ owner, repo }, { rejectWithValue }) => {
    try {
      return await githubService.getAllIssues({
        owner,
        repo,
        state: IssueType.ALL,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

type FetchRepoStarsArguments = Parameters<typeof githubService.getRepoStars>[0];

export const fetchRepoStars = createAsyncThunk<
  RepoStars,
  FetchRepoStarsArguments,
  {
    rejectValue: unknown;
  }
>(
  "currentRepo/fetchRepoStars",
  async ({ owner, repo }, { rejectWithValue }) => {
    try {
      return await githubService.getRepoStars({
        owner,
        repo,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const currentRepoSlice = createSlice({
  name: "currentRepo",
  initialState,
  reducers: {
    setCurrentUserRepo: (
      state,
      action: PayloadAction<{ owner: string; repo: string }>
    ) => {
      state.owner = action.payload.owner;
      state.repo = action.payload.repo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIssues.pending, (state) => {
        state.issuesLoading = Loading.PENDING;
      })
      .addCase(fetchAllIssues.fulfilled, (state, action) => {
        state.issues = action.payload;
        state.issuesLoading = Loading.SUCCEEDED;
      })
      .addCase(fetchAllIssues.rejected, (state, action) => {
        state.issuesLoading = Loading.FAILED;
        console.error(action.payload);
      })
      .addCase(fetchRepoStars.pending, (state) => {
        state.starsNumberLoading = Loading.PENDING;
      })
      .addCase(fetchRepoStars.fulfilled, (state, action) => {
        state.starsNumberLoading = Loading.SUCCEEDED;
        state.starsNumber = action.payload;
      })
      .addCase(fetchRepoStars.rejected, (state, action) => {
        state.starsNumberLoading = Loading.FAILED;
        console.error(action.payload);
      });
  },
});

export const {
  reducer,
  actions: { setCurrentUserRepo },
} = currentRepoSlice;
