import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { optionsReducer, todosReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	options: optionsReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
