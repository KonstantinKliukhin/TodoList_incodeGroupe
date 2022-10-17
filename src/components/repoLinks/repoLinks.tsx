import { FC } from 'react'

import { useAppSelector } from '../../redux/hooks'
import repoSelector from '../../redux/selectors/repoSelector'
import { GithubURL } from '../../types/githubURL'
import { IRepo } from '../../types/repository'

const RepoLinks: FC = () => {
  const repo = useAppSelector<IRepo | null>(repoSelector)

  if (!repo?.owner || !repo.repoName) {
    return null
  }

  const { owner, repoName } = repo

  return (
    <div data-testid='repo-links' className='d-flex align-items-center h-100 fs-3 w-100'>
      <a target='_blank' rel='noreferrer noopener' href={`${GithubURL.BASEURL}/${owner}`}>
        {owner}
      </a>
      <p className='d-inline-block mb-0 mx-2'>{'>'}</p>
      <a
        target='_blank'
        rel='noreferrer noopener'
        href={`${GithubURL.BASEURL}/${owner}/${repoName}`}
      >
        {repoName}
      </a>
    </div>
  )
}

export default RepoLinks
