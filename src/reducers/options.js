import { ACTION_TYPE } from '../actions';
const initialState = {
	isLoading: true,
	search: '',
	orderBy: false,
	editId: null,
};

export const optionsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.LOADING_END:
			return {
				...state,
				isLoading: false,
			};
		case ACTION_TYPE.SET_SEARCH:
			return {
				...state,
				search: payload,
			};
		case ACTION_TYPE.SET_ORDER_BY:
			return {
				...state,
				orderBy: payload,
			};
		case ACTION_TYPE.EDIT_TODO:
			return {
				...state,
				editId: payload,
			};
		default:
			return state;
	}
};
