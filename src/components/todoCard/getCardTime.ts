import { IIssue } from '../../types/issue'

function getDifferenceInDays(date: string) {
  const pastDate = new Date(date).getTime()
  const now = Date.now()

  const difference = now - pastDate

  const differenceInDays = difference / 1000 / 60 / 60 / 24

  return differenceInDays
}

export default function getCardTimeText(todo: IIssue) {
  let firstWord
  let date

  if (todo.closedAt) {
    firstWord = 'Closed'
    date = todo.closedAt
  } else {
    firstWord = 'Opened'
    date = todo.createdAt
  }

  const differenceInDays = getDifferenceInDays(date)

  if (differenceInDays < 1) {
    const differenceInHours = Math.floor(differenceInDays * 24)

    if (differenceInHours < 1) {
      return `${firstWord} less then 1 hour ago`
    }

    return `${firstWord} ${differenceInHours} hours ago`
  }

  const roundedDifferenceInDays = Math.floor(differenceInDays)

  if (roundedDifferenceInDays === 1) {
    return `${firstWord} ${roundedDifferenceInDays} day ago`
  }

  return `${firstWord} ${roundedDifferenceInDays} days ago`
}
