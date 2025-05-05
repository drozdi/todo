import { useTodos } from '../../store/todos';
import { XBtn, XIcon } from '../ui';

export function OrderBtn() {
	const { orderBy, setOrderBy } = useTodos();
	const onClickSort = () => {
		if (orderBy === 'asc') {
			setOrderBy('desc');
		} else if (orderBy === 'desc') {
			setOrderBy(false);
		} else {
			setOrderBy('asc');
		}
	};
	return (
		<XBtn icon={true} onClick={onClickSort}>
			<XIcon>
				{orderBy === 'asc'
					? 'mdi-sort-ascending'
					: orderBy === 'desc'
						? 'mdi-sort-descending'
						: 'mdi-sort'}
			</XIcon>
		</XBtn>
	);
}
