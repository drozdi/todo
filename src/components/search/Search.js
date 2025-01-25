import { useContext } from 'react';
import { XInput } from '../ui/Input/XInput';
import { SearchContext } from './SearchContext';

export function Search() {
	const [find, setFind] = useContext(SearchContext);
	const onChangeFind = (event) => {
		setFind(event.target.value);
	};
	return (
		<XInput
			value={find}
			label="Найти"
			onChange={onChangeFind}
			placeholder="Что ищим?"
		/>
	);
}
