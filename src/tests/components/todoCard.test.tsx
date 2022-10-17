import { fireEvent } from '@testing-library/react'

import TodoCard from '../../components/todoCard/TodoCard'
import { OPENED_ISSUE } from '../data/reduxState'
import { getMouseEvent } from '../helpers/getMouseEvent'
import renderWithProviders from '../helpers/renderWithProviders'

describe('TEST TODOCARD', () => {
  test('DRAG OVER CARD CHANGE BOX SHADOW OF CARD', () => {
    const { getByTestId } = renderWithProviders(<TodoCard todo={OPENED_ISSUE} />)

    const openedTodoCard = getByTestId('todo-card-open')

    const distaanceFromTopToCardMiddle = openedTodoCard.offsetTop + openedTodoCard.offsetHeight / 2

    const dragOverOnTopOfCard = getMouseEvent('dragover', {
      pageY: distaanceFromTopToCardMiddle + 10,
    })

    fireEvent(openedTodoCard, dragOverOnTopOfCard)

    expect(openedTodoCard).toHaveStyle({ boxShadow: '0px 8px 3px #0b5ed7' })

    const dragOverOnBottomOfCard = getMouseEvent('dragover', {
      pageY: distaanceFromTopToCardMiddle - 10,
    })

    fireEvent(openedTodoCard, dragOverOnBottomOfCard)

    expect(openedTodoCard).toHaveStyle({ boxShadow: '0px -8px 3px #0b5ed7' })
  })

  test('DRAGEND, DRAGLEAVE AND DROP CHANGES BOXSHADOW TO NONE', () => {
    const { getByTestId } = renderWithProviders(<TodoCard todo={OPENED_ISSUE} />)

    const openedTodoCard = getByTestId('todo-card-open')

    const distaanceFromTopToCardMiddle = openedTodoCard.offsetTop + openedTodoCard.offsetHeight / 2

    const dragOverOnTopOfCard = getMouseEvent('dragover', {
      pageY: distaanceFromTopToCardMiddle + 10,
    })

    fireEvent(openedTodoCard, dragOverOnTopOfCard)

    fireEvent.dragEnd(openedTodoCard)

    expect(openedTodoCard).toHaveStyle({ boxShadow: 'none' })

    fireEvent(openedTodoCard, dragOverOnTopOfCard)

    fireEvent.dragLeave(openedTodoCard)

    expect(openedTodoCard).toHaveStyle({ boxShadow: 'none' })

    fireEvent(openedTodoCard, dragOverOnTopOfCard)

    fireEvent.drop(openedTodoCard)

    expect(openedTodoCard).toHaveStyle({ boxShadow: 'none' })
  })
})
