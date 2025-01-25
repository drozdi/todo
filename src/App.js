import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodoAction } from './actions';
import styles from './App.module.css';
import { Create } from './components/create';
import { OrderBtn } from './components/order';
import { Search } from './components/search';
import { Todo } from './components/todo';
import { selectIsLoading, selectOrderBy, selectSearch, selectTodos } from './selectors';

function App() {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectIsLoading);
	const search = useSelector(selectSearch);
	const orderBy = useSelector(selectOrderBy);
	const computedTodos = useMemo(() => {
		let newTodos = [...todos];
		if (search) {
			newTodos = newTodos.filter((todo) => todo.title.includes(search));
		}
		if (orderBy === 'asc') {
			newTodos.sort((a, b) => a.title.localeCompare(b.title));
		} else if (orderBy === 'desc') {
			newTodos.sort((a, b) => b.title.localeCompare(a.title));
		}
		return newTodos;
	}, [todos, search, orderBy]);

	useEffect(() => {
		dispatch(loadTodoAction());
	}, []);

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-7">
						<Create />
					</div>
					<div className="col-span-4">
						<Search />
					</div>
					<div className="col-span-1">
						<OrderBtn />
					</div>
				</div>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<>
						<h2 className={styles.heading}>Список:</h2>
						{!computedTodos.length && (
							<p className="text-center text-9xl">Пусто</p>
						)}
						<ul className={styles.list}>
							{computedTodos.map((item) => {
								return <Todo key={item.id} {...item} />;
							})}
						</ul>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
