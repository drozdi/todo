import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE } from '../../actions';
import { selectSearch } from '../../selectors';
import { debounce } from '../../utils';
import { XInput } from '../ui/input';

export function Search() {
	const dispatch = useDispatch();
	const [search, setSearch] = useState(useSelector(selectSearch));
	const find = debounce((search) => {
		dispatch({ type: ACTION_TYPE.SET_SEARCH, payload: search });
	}, 1000);
	const onChange = ({ target }) => {
		setSearch(target.value);
		find(target.value);
	};
	return (
		<XInput
			value={search}
			label="Найти"
			onChange={onChange}
			placeholder="Что ищим?"
		/>
	);
}
