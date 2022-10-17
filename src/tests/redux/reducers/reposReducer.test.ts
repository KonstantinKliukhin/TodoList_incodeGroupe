import { reducer as reposReducer } from '../../../redux/slices/reposSlice'
import { IssueState } from '../../../types/issue'
import { Loading } from '../../../types/loadingState'
import { CLOSED_ISSUE, OPENED_ISSUE, REDUX_ONE_REPO_ONE_CLOSED_ISSUE } from '../../data/reduxState'
import { REDUX_ONE_REPO_FILLED_ISSUES } from './../../data/reduxState'

describe('TEST REPOREDUCER', () => {
  test('TEST CURRENTISSUESET WITH EMPTY STATE', () => {
    const initialState = {
      currentRepoId: null,
      currentIssue: null,
      currentRepoLoadingStatus: Loading.IDLE,
      repos: [],
    }

    const action = {
      payload: OPENED_ISSUE,
      type: 'repos/currentIssueSet',
    }

    expect(reposReducer(initialState, action)).toEqual({
      ...initialState,
      currentIssue: OPENED_ISSUE,
    })
  })

  test('TEST CURRENTISSUESET WITH FILLED STATE', () => {
    const initialState = {
      currentRepoId: null,
      currentIssue: OPENED_ISSUE,
      currentRepoLoadingStatus: Loading.IDLE,
      repos: [],
    }

    const action = {
      payload: CLOSED_ISSUE,
      type: 'repos/currentIssueSet',
    }

    expect(reposReducer(initialState, action)).toEqual({
      ...initialState,
      currentIssue: CLOSED_ISSUE,
    })
  })

  test('TEST CURRENTISSUEDELETED', () => {
    const initialState = {
      currentRepoId: null,
      currentIssue: OPENED_ISSUE,
      currentRepoLoadingStatus: Loading.IDLE,
      repos: [],
    }

    const action = {
      payload: null,
      type: 'repos/currentIssueDeleted',
    }

    expect(reposReducer(initialState, action)).toEqual({
      ...initialState,
      currentIssue: null,
    })
  })

  test('TEST ISSUETOREPOADDED WITH FILLED STATE', () => {
    const initialState = {
      currentRepoId: 1,
      currentIssue: CLOSED_ISSUE,
      currentRepoLoadingStatus: Loading.SUCCEEDED,
      repos: REDUX_ONE_REPO_ONE_CLOSED_ISSUE.repos.repos,
    }

    const action = {
      payload: IssueState.OPEN,
      type: 'repos/issueToRepoAdded',
    }

    expect(reposReducer(initialState, action).repos[0].openIssues[0].id).toBe(CLOSED_ISSUE.id)

    expect(
      reposReducer(initialState, {
        payload: IssueState.OPEN,
        type: 'repos/issueToRepoAdded',
      }).currentIssue,
    ).toBeNull()
  })

  test('TEST ISSUETOREPOADDED WITH EMPTY CURRENTISSUE STATE', () => {
    const initialState = {
      currentRepoId: 1,
      currentIssue: null,
      currentRepoLoadingStatus: Loading.SUCCEEDED,
      repos: REDUX_ONE_REPO_ONE_CLOSED_ISSUE.repos.repos,
    }

    const action = {
      payload: IssueState.OPEN,
      type: 'repos/issueToRepoAdded',
    }

    expect(reposReducer(initialState, action)).toEqual(initialState)
  })

  test('TEST ISSUEORDERCHANGED TO INSERTING AFTER ELEMENT', () => {
    const initialState = {
      currentRepoId: 1,
      currentIssue: OPENED_ISSUE,
      currentRepoLoadingStatus: Loading.SUCCEEDED,
      repos: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos,
    }

    const action = {
      payload: {
        ...CLOSED_ISSUE,
        displacement: 1,
      },
      type: 'repos/issueOrderChanged',
    }

    expect(reposReducer(initialState, action).repos[0].closedIssues[1].id).toBe(OPENED_ISSUE.id)
  })

  test('TEST ISSUEORDERCHANGED TO INSERTING BEFORE ELEMENT', () => {
    const initialState = {
      currentRepoId: 1,
      currentIssue: OPENED_ISSUE,
      currentRepoLoadingStatus: Loading.SUCCEEDED,
      repos: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos,
    }

    const action = {
      payload: {
        ...CLOSED_ISSUE,
        displacement: 0,
      },
      type: 'repos/issueOrderChanged',
    }

    expect(reposReducer(initialState, action).repos[0].closedIssues[0].id).toBe(OPENED_ISSUE.id)
  })

  test('TEST ISSUEORDERCHANGED WITH EMPTY CURRENTISSUE STATE', () => {
    const initialState = {
      currentRepoId: 1,
      currentIssue: null,
      currentRepoLoadingStatus: Loading.SUCCEEDED,
      repos: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos,
    }

    const action = {
      payload: {
        ...CLOSED_ISSUE,
        displacement: 0,
      },
      type: 'repos/issueOrderChanged',
    }

    expect(reposReducer(initialState, action)).toEqual(initialState)
  })

  test('TEST FETCHREPO PENDING', () => {
    const initialState = {
      currentRepoId: null,
      currentIssue: null,
      currentRepoLoadingStatus: Loading.IDLE,
      repos: [],
    }

    const action = {
      payload: null,
      type: 'repos/fetchRepo/pending',
    }

    expect(reposReducer(initialState, action)).toEqual({
      ...initialState,
      currentRepoLoadingStatus: Loading.PENDING,
    })
  })

  test('TEST FETCHREPO FULFILLED WITH EMPTY STATE', () => {
    const initialState = {
      currentRepoId: null,
      currentIssue: null,
      currentRepoLoadingStatus: Loading.IDLE,
      repos: [],
    }

    const action = {
      payload: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos[0],
      type: 'repos/fetchRepo/fulfilled',
    }

    expect(reposReducer(initialState, action)).toEqual(REDUX_ONE_REPO_FILLED_ISSUES.repos)
  })

  test('TEST FETCHREPO FULFILLED WITH FILLED STATE', () => {
    const initialState = REDUX_ONE_REPO_FILLED_ISSUES.repos

    const action = {
      payload: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos[0],
      type: 'repos/fetchRepo/fulfilled',
    }

    expect(reposReducer(initialState, action)).toEqual(initialState)
  })

  test('TEST FETCHREPO ERROR WITH EMPTY STATE', () => {
    const initialState = {
      currentRepoId: null,
      currentIssue: null,
      currentRepoLoadingStatus: Loading.IDLE,
      repos: [],
    }

    const action = {
      payload: {
        owner: 'Some User',
        repo: 'some repository',
      },
      type: 'repos/fetchRepo/rejected',
    }

    expect(reposReducer(initialState, action)).toEqual({
      ...initialState,
      currentRepoLoadingStatus: Loading.FAILED,
    })
  })

  test('TEST FETCH REPO ERROR WITH FILLED STATE', () => {
    const initialState = {
      ...REDUX_ONE_REPO_FILLED_ISSUES.repos,
      currentRepoId: null,
    }

    const action = {
      payload: {
        owner: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos[0].owner,
        repoName: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos[0].repoName,
      },
      type: 'repos/fetchRepo/rejected',
    }

    expect(reposReducer(initialState, action)).toEqual({
      ...initialState,
      currentRepoId: REDUX_ONE_REPO_FILLED_ISSUES.repos.repos[0].id,
      currentRepoLoadingStatus: Loading.SUCCEEDED,
    })
  })
})
