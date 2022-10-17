import { FC } from 'react'

import { useAppSelector } from '../../redux/hooks'
import { Loading } from '../../types/loadingState'
import { IRepo } from '../../types/repository'
import repoSelector from './../../redux/selectors/repoSelector'
import setContent from './../../utils/setContent'
import getStarsNumberText from './getStarsNumberText'

const RepoRating: FC = () => {
  const repoLoading = useAppSelector<Loading>((state) => state.repos.currentRepoLoadingStatus)
  const repo = useAppSelector<IRepo | null>(repoSelector)

  const renderRepoStars = () => {
    if (repo?.starsNumber == null) {
      return null
    }

    return (
      <>
        <svg
          data-testid='repo-rating-svg'
          fill='#e3b341'
          aria-hidden='true'
          height='25'
          viewBox='0 0 16 16'
          version='1.1'
          width='25'
          data-view-component='true'
          className='me-2'
        >
          <path
            fillRule='evenodd'
            d='M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z'
          ></path>
        </svg>
        <p className='fs-2 mb-0'>{getStarsNumberText(repo.starsNumber)} stars</p>
      </>
    )
  }

  return (
    <div className='d-flex align-items-center h-100'>
      {setContent(repoLoading, renderRepoStars)}
    </div>
  )
}

export default RepoRating
