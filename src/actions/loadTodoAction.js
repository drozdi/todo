import { todoRepository } from '../api';
import { ACTION_TYPE } from './types';

export const loadTodoAction = () => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return todoRepository
		.list()
		.then((res) => res.json())
		.then((todos) => {
			dispatch({ type: ACTION_TYPE.SET_TODOS, payload: todos });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
