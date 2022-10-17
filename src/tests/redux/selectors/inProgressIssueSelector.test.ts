import { inProgressIssuesSelector } from '../../../redux/selectors/issuesSelectors'
import { setupStore } from '../../../redux/store'
import { IN_PROGRESS_ISSUE, REDUX_ONE_REPO_FILLED_ISSUES } from '../../data/reduxState'

describe('TEST INPROGRESSISSUESELECTOR', () => {
  test('WORK WITH EMPTY STATE', () => {
    const store = setupStore()

    const state = store.getState()
    expect(inProgressIssuesSelector(state)).toEqual([])
  })

  test('WORKS WITH FILLED STATE', () => {
    const store = setupStore(REDUX_ONE_REPO_FILLED_ISSUES)

    const state = store.getState()
    expect(inProgressIssuesSelector(state)).toEqual([IN_PROGRESS_ISSUE])
  })
})
