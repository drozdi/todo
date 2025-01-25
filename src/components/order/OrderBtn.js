import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE } from '../../actions';
import { selectOrderBy } from '../../selectors';
import { XBtn, XIcon } from '../ui';

export function OrderBtn() {
	const dispatch = useDispatch();
	const sort = useSelector(selectOrderBy);
	const onClickSort = () => {
		if (sort === 'asc') {
			dispatch({ type: ACTION_TYPE.SET_ORDER_BY, payload: 'desc' });
		} else if (sort === 'desc') {
			dispatch({ type: ACTION_TYPE.SET_ORDER_BY, payload: false });
		} else {
			dispatch({ type: ACTION_TYPE.SET_ORDER_BY, payload: 'asc' });
		}
	};
	return (
		<XBtn icon={true} onClick={onClickSort}>
			<XIcon>
				{sort === 'asc'
					? 'mdi-sort-ascending'
					: sort === 'desc'
						? 'mdi-sort-descending'
						: 'mdi-sort'}
			</XIcon>
		</XBtn>
	);
}
