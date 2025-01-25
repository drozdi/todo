import { todoRepository } from '../api';
import { ACTION_TYPE } from './types';

export const updateTodoAction =
	({ id, title }) =>
	(dispatch) => {
		if (!title.trim()) {
			return;
		}
		dispatch({ type: ACTION_TYPE.LOADING_START });
		return todoRepository
			.put(id, { title: title.trim() })
			.then((res) => res.json())
			.then((res) => {
				dispatch({
					type: ACTION_TYPE.UPDATE_TODO,
					payload: { id, title: title.trim() },
				});
				dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: null });
			})
			.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
	};
