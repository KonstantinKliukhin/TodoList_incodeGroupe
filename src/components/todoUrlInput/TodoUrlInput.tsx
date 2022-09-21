import { FC, useState, ChangeEventHandler, FormEventHandler } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const TodoUrlInput: FC = () => {
	const [URL, setURL] = useState<string>('');

	const onChangeURL: ChangeEventHandler<HTMLInputElement> = (e) => {
		setURL(e.target.value);
	};

	const onURLFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		console.log(URL);
	};

	return (
		<Form onSubmit={onURLFormSubmit} className='d-flex gap-3 mt-3'>
			<InputGroup>
				<InputGroup.Text className='px-2' id='prevTodoURLInput'>
					https://github.com/
				</InputGroup.Text>
				<Form.Control
					id='todoURLInput'
					value={URL}
					onChange={onChangeURL}
					placeholder="Enter repo URL"
				/>
			</InputGroup>
			<Button
				size='sm'
				className='px-4'
				variant="primary"
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};

export default TodoUrlInput;