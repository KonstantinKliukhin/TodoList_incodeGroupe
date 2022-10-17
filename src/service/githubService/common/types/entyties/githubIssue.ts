import { IssueState } from '../../../../../types/issue'
import { IGithubMilestone } from './githubMilestone'
import { IGithubPullRequest } from './githubPullRequest'
import { IGithubUser } from './githubUser'

export interface IGithubIssueLabel {
  id: number
  node_id: string
  url: string
  name: string
  description: string
  color: string
  default: boolean
}

export type GithubIssueState = IssueState.OPEN | IssueState.CLOSED

export interface IGithubIssue {
  id: number
  node_id: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  number: number
  state: GithubIssueState
  title: string
  body?: string
  user: IGithubUser
  labels: IGithubIssueLabel[]
  assignee?: IGithubUser
  assignees?: IGithubUser[]
  milestone: IGithubMilestone
  locked: boolean
  active_lock_reason?: string
  comments: number
  pull_request?: IGithubPullRequest
  closed_at?: string
  created_at: string
  updated_at: string
  closed_by?: IGithubUser
  author_association: string
  state_reason?: string
}
