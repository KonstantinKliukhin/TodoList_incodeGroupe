import { closedIssuesSelector } from '../../../redux/selectors/issuesSelectors'
import { setupStore } from '../../../redux/store'
import { CLOSED_ISSUE, REDUX_ONE_REPO_FILLED_ISSUES } from '../../data/reduxState'

describe('TEST CLOSEDISSUESELECTOR', () => {
  test('WORK WITH EMPTY STATE', () => {
    const store = setupStore()

    const state = store.getState()
    expect(closedIssuesSelector(state)).toEqual([])
  })

  test('WORKS WITH FILLED STATE', () => {
    const store = setupStore(REDUX_ONE_REPO_FILLED_ISSUES)

    const state = store.getState()
    expect(closedIssuesSelector(state)).toEqual([CLOSED_ISSUE])
  })
})
