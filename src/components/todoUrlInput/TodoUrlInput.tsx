import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'

import { useAppDispatch } from '../../redux/hooks'
import { fetchRepo } from '../../redux/slices/reposSlice'
import { GithubApiURL } from '../../types/githubApiURL'
import { getRoutesFromURL } from './../../utils'
import validateTodoInputData from './validateTodoInputData'

const TodoURLInput: FC = () => {
  const [currentURL, setCurrentURL] = useState<string>('')
  const [URLInputError, setURLInputError] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const onChangeURL: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentURL(e.target.value)
  }

  const onURLFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const fullURL = GithubApiURL.BASEURL + currentURL

    const pathes = getRoutesFromURL(fullURL)

    if (!pathes) {
      setURLInputError(true)
      return
    }

    const isValidInputData = validateTodoInputData(pathes)

    if (isValidInputData) {
      setURLInputError(false)

      const options = {
        owner: pathes[0],
        repoName: pathes[1],
      }

      dispatch(fetchRepo(options))
    } else {
      setURLInputError(true)
    }
  }

  return (
    <Form data-testid='url-form' onSubmit={onURLFormSubmit} className='d-flex gap-3 mt-3'>
      <InputGroup hasValidation>
        <InputGroup.Text className='px-2' id='prevTodoURLInput'>
          https://github.com/
        </InputGroup.Text>
        <Form.Control
          data-testid='url-input'
          id='todoURLInput'
          value={currentURL}
          onChange={onChangeURL}
          placeholder='user/repo'
          isInvalid={URLInputError}
        />
        <FormControl.Feedback
          data-testid='url-input-error'
          className='position-absolute top-100'
          type='invalid'
        >
          Invalid path, example: "facebook/react"
        </FormControl.Feedback>
      </InputGroup>
      <Button 
				size='sm' 
				className='px-4' 
				variant='primary' 
				type='submit'
			>
        Submit
      </Button>
    </Form>
  )
}

export default TodoURLInput
