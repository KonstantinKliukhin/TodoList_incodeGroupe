import { act } from '@testing-library/react'

import RepoRating from '../../components/repoRating/RepoRating'
import { fetchRepo } from '../../redux/slices/reposSlice/reposSlice'
import { setupStore } from '../../redux/store'
import {
  correctFetchOptions,
  inCorrectOptionsToFetch,
  mockFetchingRepo,
} from '../helpers/mockFetchingRepo'
import renderWithProviders from '../helpers/renderWithProviders'

mockFetchingRepo()

describe('TEST REPORATING', () => {
  test('TEST LINKS APPEARES AFTER THE DATA IS FETCHED', async () => {
    const store = setupStore()

    const { queryByTestId, findByTestId } = renderWithProviders(<RepoRating />, { store })

    expect(queryByTestId('repo-rating-svg')).not.toBeInTheDocument()

    await act(async () => {
      await store.dispatch(fetchRepo(correctFetchOptions))
    })

    const repoRatingSvg = await findByTestId('repo-rating-svg')

    expect(repoRatingSvg).toBeInTheDocument()
  })

  test('TEST LOADING APPEARES AFTER THE DATA IS REQUESTED', async () => {
    const store = setupStore()

    const { queryByTestId, findByTestId } = renderWithProviders(<RepoRating />, { store })

    expect(queryByTestId('loading-spinner')).not.toBeInTheDocument()

    act(() => {
      store.dispatch(fetchRepo(inCorrectOptionsToFetch))
    })

    const loadingSpinner = await findByTestId('loading-spinner')

    expect(loadingSpinner).toBeInTheDocument()
  })

  test('TEST ERROR APPEARES AFTER THE ERROR IS RECEIVED', async () => {
    const store = setupStore()

    const { queryByTestId, findByTestId } = renderWithProviders(<RepoRating />, { store })

    expect(queryByTestId('error')).toBeNull()

    await act(async () => {
      await store.dispatch(fetchRepo(inCorrectOptionsToFetch))
    })

    const error = await findByTestId('error')

    expect(error).toBeInTheDocument()
  })
})
