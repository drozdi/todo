import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAction } from '../../actions';
import { XInput } from '../ui';
export function Create() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const onChange = ({ target }) => {
		setTitle(target.value);
	};
	const onKeyPress = ({ key }) => {
		if (key === 'Enter') {
			dispatch(addTodoAction(title));
			setTitle('');
		}
	};
	return (
		<XInput
			value={title}
			label="Добавить"
			placeholder="Введите дело"
			onChange={onChange}
			onKeyPress={onKeyPress}
		/>
	);
}
