import { useCallback, useState } from 'react';
import { useTodos } from '../../store/todos';
import { debounce } from '../../utils';
import { XInput } from '../ui/input';

export function Search() {
	const { search, setSearch } = useTodos();
	const [sear, setSear] = useState(search);
	const find = useCallback(
		debounce(
			(search) => {
				setSearch(search);
			},
			500,
			[],
		),
	);
	const onChange = ({ target }) => {
		setSear(target.value);
		find(target.value);
	};
	return (
		<XInput value={sear} label="Найти" onChange={onChange} placeholder="Что ищим?" />
	);
}
