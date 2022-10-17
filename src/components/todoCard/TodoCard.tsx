import { DragEvent, DragEventHandler, FC, useRef } from 'react'
import { Card } from 'react-bootstrap'

import { useAppDispatch } from '../../redux/hooks'
import {
  currentIssueDeleted,
  currentIssueSet,
  issueOrderChanged,
} from '../../redux/slices/reposSlice'
import { IIssue } from '../../types/issue'
import getCardTimeText from './getCardTime'

interface TodoCardProps {
  todo: IIssue
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const dragStartHandler: DragEventHandler<HTMLElement> = () => {
    dispatch(currentIssueSet(todo))
  }

  const dragLeaveHandler: DragEventHandler<HTMLElement> = () => {
    if (cardRef.current) {
      cardRef.current.style.boxShadow = 'none'
    }
  }

  const dragEndHandler: DragEventHandler<HTMLElement> = () => {
    if (cardRef.current) {
      cardRef.current.style.boxShadow = 'none'
    }

    dispatch(currentIssueDeleted())
  }

  const dragOverHandler: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault()

    if (!cardRef.current) return

    const distaanceFromTopToCardMiddle =
      cardRef.current?.offsetTop + cardRef.current?.offsetHeight / 2

    const isMouseUpperThanCardMiddle = distaanceFromTopToCardMiddle > e.pageY

    if (isMouseUpperThanCardMiddle) {
      cardRef.current.style.boxShadow = '0px -8px 3px #0b5ed7'
    } else {
      cardRef.current.style.boxShadow = '0px 8px 3px #0b5ed7'
    }
  }

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()

    if (!cardRef.current) return

    const distaanceFromTopToCardMiddle =
      cardRef.current?.offsetTop + cardRef.current?.offsetHeight / 2

    const isMouseUpperThanCardMiddle = distaanceFromTopToCardMiddle > e.pageY

    let displacement: number

    if (isMouseUpperThanCardMiddle) {
      displacement = 0
    } else {
      displacement = 1
    }

    if (cardRef.current) {
      cardRef.current.style.boxShadow = 'none'
    }

    dispatch(
      issueOrderChanged({
        ...todo,
        displacement,
      }),
    )
  }

  const cardTimeText = getCardTimeText(todo)

  return (
    <Card
      data-testid={`todo-card-${todo.state}`}
      ref={cardRef}
      className='cursor-grab'
      draggable={true}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e)}
    >
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>
          #{todo.order} {cardTimeText}
        </Card.Text>
        <Card.Text>
          {todo.user.name} | Comments: {todo.commentsNumber}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TodoCard
