import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { CORRECT_GITHUBAPI_ISSUES_URL, GITHUBAPI_ISSUES_RESULT } from '../data/githubApiIssues'
import { CORRECT_GITHUBAPI_REPO_URL, GITHUBAPI_REPO_RESULT } from '../data/githubApiRepo'

export function mockFetchingRepo() {
  const handlers = [
    rest.get(CORRECT_GITHUBAPI_REPO_URL, (req, res, ctx) => {
      return res(ctx.json(GITHUBAPI_REPO_RESULT), ctx.delay(150))
    }),
    rest.get(CORRECT_GITHUBAPI_ISSUES_URL, (req, res, ctx) => {
      return res(ctx.json(GITHUBAPI_ISSUES_RESULT), ctx.delay(150))
    }),
    rest.get(
      'https://api.github.com/repos/ERROR_OPTION_TO_FETCH/ERROR_OPTION_TO_FETCH/issues',
      (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: 'Not Found' }), ctx.delay(150))
      },
    ),
    rest.get(
      'https://api.github.com/repos/ERROR_OPTION_TO_FETCH/ERROR_OPTION_TO_FETCH',
      (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: 'Not Found' }), ctx.delay(150))
      },
    ),
  ]

  const server = setupServer(...handlers)

  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())
}

export const correctFetchOptions = {
  owner: 'octocat',
  repoName: 'Hello-World',
}

export const inCorrectOptionsToFetch = {
  owner: 'ERROR_OPTION_TO_FETCH',
  repoName: 'ERROR_OPTION_TO_FETCH',
}
