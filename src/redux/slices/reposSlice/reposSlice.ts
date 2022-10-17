import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { githubService } from '../../../service'
import { IIssue, IssueState } from '../../../types/issue'
import { Loading } from '../../../types/loadingState'
import { IRepo } from '../../../types/repository'
import { findIndexById } from './../../../utils'
import { IRepoInitialState } from './common/types/initialState'
import deleteIssue from './common/utils/deleteIssue'
import insertIssues from './common/utils/insertIssue'
import pushIssue from './common/utils/pushIssue'
import updateIssue from './common/utils/updateIssue'

const initialState: IRepoInitialState = {
  currentRepoId: null,
  currentIssue: null,
  currentRepoLoadingStatus: Loading.IDLE,
  repos: [],
}

type FetchRepoArguments = Pick<Parameters<typeof githubService.getRepo>[0], 'owner' | 'repoName'>

export const fetchRepo = createAsyncThunk<
  IRepo,
  FetchRepoArguments,
  {
    rejectValue: FetchRepoArguments & { error: unknown }
  }
>('repos/fetchRepo', async ({ owner, repoName }, { rejectWithValue }) => {
  try {
    return await githubService.getRepo({
      owner,
      repoName,
    })
  } catch (e) {
    return rejectWithValue({
      owner,
      repoName,
      error: e,
    })
  }
})

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    currentIssueSet: (state, action: PayloadAction<IIssue>) => {
      state.currentIssue = action.payload
    },
    currentIssueDeleted: (state) => {
      state.currentIssue = null
    },
    issueToRepoAdded: (state, action: PayloadAction<IssueState>) => {
      if (state.currentRepoId === null || !state.currentIssue) return

      const currentRepoIndex = findIndexById<IRepo>(state.repos, state.currentRepoId)

      deleteIssue(state, currentRepoIndex)

      updateIssue(action.payload, state.currentIssue)

      pushIssue(action.payload, state.repos[currentRepoIndex], state.currentIssue)

      state.currentIssue = null
    },
    issueOrderChanged: (state, action: PayloadAction<IIssue & { displacement: number }>) => {
      if (!state.currentRepoId || !state.currentIssue) return

      const currentRepoIndex = findIndexById<IRepo>(state.repos, state.currentRepoId)

      deleteIssue(state, currentRepoIndex)

      updateIssue(action.payload.state, state.currentIssue)

      const { displacement, ...issueWithNewIndex } = action.payload

      insertIssues(
        state.repos[currentRepoIndex],
        issueWithNewIndex,
        state.currentIssue,
        displacement,
      )

      state.currentIssue = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepo.pending, (state) => {
        state.currentRepoLoadingStatus = Loading.PENDING
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        state.currentRepoLoadingStatus = Loading.SUCCEEDED

        state.currentRepoId = action.payload.id

        const isRepoInRepos = state.repos.some((repo) => {
          return repo.id === action.payload.id
        })

        if (!isRepoInRepos) {
          state.repos.push(action.payload)
        }
      })
      .addCase(fetchRepo.rejected, (state, action) => {
        if (!action.payload) return
        const { owner, repoName } = action.payload

        const currentRepo = state.repos.find((repo) => {
          return repo.repoName === repoName && repo.owner === owner
        })

        if (currentRepo) {
          state.currentRepoId = currentRepo.id
          state.currentRepoLoadingStatus = Loading.SUCCEEDED
          return
        }

        state.currentRepoLoadingStatus = Loading.FAILED
      })
  },
})

export const {
  reducer,
  actions: { issueOrderChanged, currentIssueSet, currentIssueDeleted, issueToRepoAdded },
} = reposSlice
