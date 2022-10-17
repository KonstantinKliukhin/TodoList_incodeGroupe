import { fireEvent } from '@testing-library/react'

import TodoURLInput from '../../components/todoURLInput/TodoURLInput'
import renderWithProviders from '../helpers/renderWithProviders'

describe('TEST TODOURLINPUT', () => {
  test('TEST URL INPUT', () => {
    const { getByTestId } = renderWithProviders(<TodoURLInput />)

    const URLInput = getByTestId('url-input')
    const URLInputError = getByTestId('url-input-error')

    expect(URLInput).toContainHTML('')
    expect(URLInputError).toBeInTheDocument()

    fireEvent.input(URLInput, {
      target: {
        value: 'input Is v@l1D',
      },
    })

    expect(URLInput).toContainHTML('input Is v@l1D')
  })

  test('TEST URL FORM SUBMIT', () => {
    const { getByTestId } = renderWithProviders(<TodoURLInput />)

    const URLForm = getByTestId('url-form')
    const URLInput = getByTestId('url-input')

    fireEvent.input(URLInput, {
      target: {
        value: '',
      },
    })

    fireEvent.submit(URLForm)

    expect(URLInput).toHaveClass('is-invalid')

    fireEvent.input(URLInput, {
      target: {
        value: '/',
      },
    })

    fireEvent.submit(URLForm)

    expect(URLInput).toHaveClass('is-invalid')

    fireEvent.input(URLInput, {
      target: {
        value: 'input Is v@l1D',
      },
    })

    fireEvent.submit(URLForm)

    expect(URLInput).toHaveClass('is-invalid')

    fireEvent.input(URLInput, {
      target: {
        value: 'facebook/react/something',
      },
    })

    fireEvent.submit(URLForm)

    expect(URLInput).toHaveClass('is-invalid')

    fireEvent.input(URLInput, {
      target: {
        value: 'facebook',
      },
    })

    fireEvent.submit(URLForm)

    expect(URLInput).toHaveClass('is-invalid')

    fireEvent.input(URLInput, {
      target: {
        value: 'facebook/react',
      },
    })

    fireEvent.submit(URLForm)

    expect(URLInput).not.toHaveClass('is-invalid')
  })
})
