import { FC } from 'react';
import { Breadcrumb } from 'react-bootstrap';

const TodoBreadCrumb: FC = () => {
	return (
		<Breadcrumb className='mt-3 fs-3 w-100'>
			<Breadcrumb.Item href='#'>facebook</Breadcrumb.Item>
			<Breadcrumb.Item active>react</Breadcrumb.Item>
		</Breadcrumb>
	)
}

export default TodoBreadCrumb;