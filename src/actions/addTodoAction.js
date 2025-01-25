import { todoRepository } from '../api';
import { ACTION_TYPE } from './types';

export const addTodoAction = (title) => (dispatch) => {
	if (!title.trim()) {
		return;
	}
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return todoRepository
		.post({ title: title.trim() })
		.then((res) => res.json())
		.then((res) => {
			dispatch({
				type: ACTION_TYPE.ADD_TODO,
				payload: res,
			});
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
