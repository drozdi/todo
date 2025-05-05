import { useState } from 'react';
import { useTodos } from '../../store/todos';
import { XInput } from '../ui';
export function Create() {
	const { add } = useTodos();
	const [title, setTitle] = useState('');
	const onChange = ({ target }) => {
		setTitle(target.value);
	};
	const onKeyPress = ({ key }) => {
		if (key === 'Enter') {
			add({
				title: title.trim(),
			});
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
