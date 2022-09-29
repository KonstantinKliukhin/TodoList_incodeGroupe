import { IIssue, IssueType } from '../../../common/types/issue';
import { Loading } from '../../../common/types/loadingState';
import { IRepo } from '../../../common/types/repository';
import { githubService } from '../../../service';
import { findIndexById } from './../../../utils';
import deleteIssue from './common/utils/deleteIssue';
import insertIssues from './common/utils/insertIssue';
import { IRepoInitialState } from './common/types/initialState';
import updateIssueState from './common/utils/updateIssueState';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IRepoInitialState = {
  currentRepoId: null,
  currentIssue: null,
  currentRepoLoadingStatus: Loading.IDLE,
  repos: [],
};

type FetchRepoArguments = Pick<Parameters<typeof githubService.getRepo>[0], 'owner' | 'repoName'>;

export const fetchRepo = createAsyncThunk<
  IRepo,
  FetchRepoArguments,
  {
    rejectValue: unknown;
  }
>('currentRepo/fetchRepo', async ({ owner, repoName }, { rejectWithValue }) => {
  try {
    return await githubService.getRepo({
      owner,
      repoName,
    });
  } catch (e) {
    return rejectWithValue(e);
  }
});

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    currentIssueSet: (state, action: PayloadAction<IIssue>) => {
      state.currentIssue = action.payload;
    },
    currentIssueDeleted: (state) => {
      state.currentIssue = null;
    },
    issueToRepoAdded: (state, action: PayloadAction<IssueType>) => {
      if (!state.currentRepoId || !state.currentIssue) return;

      const currentRepoIndex = findIndexById<IRepo>(state.repos, state.currentRepoId);

      deleteIssue(state, currentRepoIndex);

      updateIssueState(action.payload, state.currentIssue);

      switch (action.payload) {
        case IssueType.OPEN:
          state.repos[currentRepoIndex].openIssues.push(state.currentIssue);
          break;
        case IssueType.INPROGRESS:
          state.repos[currentRepoIndex].inProgressIssues.push(state.currentIssue);
          break;
        case IssueType.CLOSED:
          state.repos[currentRepoIndex].closedIssues.push(state.currentIssue);
          break;
        default: {
          const exhaustiveCheck: never = action.payload;
          throw new Error(exhaustiveCheck);
        }
      }

      state.currentIssue = null;
    },
    issueOrderChanged: (state, action: PayloadAction<IIssue & { displacement: number }>) => {
      if (!state.currentRepoId || !state.currentIssue) return;

      const currentRepoIndex = findIndexById<IRepo>(state.repos, state.currentRepoId);

      deleteIssue(state, currentRepoIndex);

      updateIssueState(action.payload.state, state.currentIssue);

      const { displacement, ...issueWithNewIndex } = action.payload;

      insertIssues(
        state.repos[currentRepoIndex],
        issueWithNewIndex,
        state.currentIssue,
        displacement
      );

      state.currentIssue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepo.pending, (state) => {
        state.currentRepoLoadingStatus = Loading.PENDING;
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        state.currentRepoLoadingStatus = Loading.SUCCEEDED;

        state.currentRepoId = action.payload.id;

        const isRepoInRepos = state.repos.some((repo) => {
          return repo.id === action.payload.id;
        });

        if (!isRepoInRepos) {
          state.repos.push(action.payload);
        }
      })
      .addCase(fetchRepo.rejected, (state, action) => {
        state.currentRepoLoadingStatus = Loading.FAILED;
        console.error(action.payload);
      });
  },
});

export const {
  reducer,
  actions: { issueOrderChanged, currentIssueSet, currentIssueDeleted, issueToRepoAdded },
} = reposSlice;
