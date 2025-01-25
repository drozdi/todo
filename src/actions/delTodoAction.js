import { todoRepository } from '../api';
import { ACTION_TYPE } from './types';

export const delTodoAction = (id) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return todoRepository
		.delete(id)
		.then((res) => res.json())
		.then((res) => {
			dispatch({
				type: ACTION_TYPE.REMOVE_TODO,
				payload: id,
			});
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
