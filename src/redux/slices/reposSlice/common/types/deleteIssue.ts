import { IRepoInitialState } from './initialState'

export type DeleteIssueType = (state: IRepoInitialState, currentRepoIndex: number) => void
