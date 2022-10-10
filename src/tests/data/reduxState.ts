import { IssueState } from "../../types/issue";
import { Loading } from "../../types/loadingState";

export const REDUX_ONE_REPO_ONE_CLOSED_ISSUE = {
  repos: {
    currentIssue: null,
    currentRepoId: 1,
    currentRepoLoadingStatus: Loading.SUCCEEDED,
    repos: [
      {
        repoName: "react",
        owner: "facebook",
        id: 1,
        starsNumber: 195000,
        openIssues: [],
        inProgressIssues: [],
        closedIssues: [
          {
            user: {
              id: 1,
              name: "Some User Name",
            },
            id: 1,
            order: 214455,
            title: "Some Title",
            state: IssueState.CLOSED,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
            closedAt: String(new Date()),
            commentsNumber: 50,
          },
        ],
      },
    ],
  },
};

export const REDUX_ONE_REPO_ONE_CLOSED_ISSUE_ONE_OPENISSUE = {
  repos: {
    currentIssue: null,
    currentRepoId: 2,
    currentRepoLoadingStatus: Loading.SUCCEEDED,
    repos: [
      {
        repoName: "some open repo name",
        owner: "some open repo owner",
        id: 2,
        starsNumber: 195000,
        openIssues: [
          {
            user: {
              id: 1,
              name: "Some User Name",
            },
            id: 1,
            order: 2144325,
            title: "Some Title",
            state: IssueState.OPEN,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
            commentsNumber: 50,
          },
        ],
        inProgressIssues: [],
        closedIssues: [
          {
            user: {
              id: 1,
              name: "Some User Name",
            },
            id: 3,
            order: 214455,
            title: "Some Title",
            state: IssueState.CLOSED,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
            closedAt: String(new Date()),
            commentsNumber: 50,
          },
        ],
      },
    ],
  },
};

export const REDUX_ONE_REPO_FILLED_ISSUES = {
  repos: {
    currentIssue: null,
    currentRepoId: 1,
    currentRepoLoadingStatus: Loading.SUCCEEDED,
    repos: [
      {
        repoName: "some open repo name",
        owner: "some open repo owner",
        id: 1,
        starsNumber: 195000,
        openIssues: [
          {
            user: {
              id: 1,
              name: "Some User Name",
            },
            id: 1,
            order: 2144325,
            title: "Some Title",
            state: IssueState.OPEN,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
            commentsNumber: 50,
          },
        ],
        inProgressIssues: [
          {
            user: {
              id: 2,
              name: "Some User Name",
            },
            id: 2,
            order: 214455,
            title: "Some Title",
            state: IssueState.INPROGRESS,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
            closedAt: String(new Date()),
            commentsNumber: 50,
          },
        ],
        closedIssues: [
          {
            user: {
              id: 3,
              name: "Some User Name",
            },
            id: 2,
            order: 214455,
            title: "Some Title",
            state: IssueState.CLOSED,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
            closedAt: String(new Date()),
            commentsNumber: 50,
          },
        ],
      },
    ],
  },
};

export const OPENED_ISSUE = {
  user: {
    id: 1,
    name: "Some User Name",
  },
  id: 1,
  order: 2144325,
  title: "Some Title",
  state: IssueState.OPEN,
  createdAt: String(new Date()),
  updatedAt: String(new Date()),
  commentsNumber: 50,
};

export const IN_PROGRESS_ISSUE = {
  user: {
    id: 2,
    name: "Some User Name",
  },
  id: 2,
  order: 214455,
  title: "Some Title",
  state: IssueState.INPROGRESS,
  createdAt: String(new Date()),
  updatedAt: String(new Date()),
  closedAt: String(new Date()),
  commentsNumber: 50,
};

export const CLOSED_ISSUE = {
  user: {
    id: 3,
    name: "Some User Name",
  },
  id: 2,
  order: 214455,
  title: "Some Title",
  state: IssueState.CLOSED,
  createdAt: String(new Date()),
  updatedAt: String(new Date()),
  closedAt: String(new Date()),
  commentsNumber: 50,
};
