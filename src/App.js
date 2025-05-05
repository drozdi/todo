import { useEffect, useMemo } from 'react';
import styles from './App.module.css';
import { Create } from './components/create';
import { OrderBtn } from './components/order';
import { Search } from './components/search';
import { Todo } from './components/todo';
import { useTodos } from './store/todos';

function App() {
	const { todos, isLoading, fetchTodos, search, orderBy } = useTodos();

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
		fetchTodos();
	}, []);

	return (
		<div className={styles.container}>
			<div className="flex gap-3">
				<div className="flex-auto">
					<Create />
				</div>
				<div className="flex-auto">
					<Search />
				</div>
				<div className="flex-none content-center items-center justify-center">
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
	);
}

export default App;
