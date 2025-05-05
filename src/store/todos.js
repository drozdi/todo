import { create } from 'zustand';
import { todoRepository } from '../api';

export const useTodos = create((set, get) => ({
	todos: [],
	isLoading: true,
	search: '',
	orderBy: false,
	editId: null,
	error: null,
	setLoading: (state) => {
		set({ isLoading: Boolean(state) });
	},
	fetchTodos: () => {
		set({ isLoading: true });
		todoRepository
			.list()
			.then((res) => res.json())
			.then((todos) => {
				set({
					todos: [...todos].reverse(),
				});
			})
			.finally(() => set({ isLoading: false }));
	},
	setSearch: (payload) => {
		set({ search: payload });
	},
	setOrderBy: (payload) => {
		set({ orderBy: payload });
	},
	setEditId: (payload) => {
		set({ editId: payload });
	},

	setList: (todos) => {
		set({
			todos: [...todos],
		});
	},
	add: (payload) => {
		if (!payload.title.trim()) {
			set({
				error: 'Неможет быть пустым!',
			});
			return;
		}
		set({ isLoading: true });
		todoRepository
			.post({ isDone: false, ...payload })
			.then((res) => res.json())
			.then((res) => {
				set({
					todos: [{ ...res }, ...get().todos],
					error: null,
				});
			})
			.finally(() => set({ isLoading: false }));
	},
	remove: (payload) => {
		set({ isLoading: true });
		todoRepository
			.delete(payload)
			.then(() => {
				set({
					todos: [...get().todos.filter(({ id }) => id !== payload)],
				});
			})
			.finally(() => set({ isLoading: false }));
	},
	update: (payload) => {
		if (!payload.title.trim()) {
			set({
				error: 'Неможет быть пустым!',
			});
			return;
		}

		set({ isLoading: true });
		payload.title = payload.title.trim();
		todoRepository
			.put(payload.id, payload)
			.then(() => {
				set({
					todos: [
						...get().todos.map((todo) => {
							if (todo.id === payload.id) {
								return { ...todo, ...payload };
							}
							return { ...todo };
						}),
					],
					editId: null,
				});
			})
			.finally(() => set({ isLoading: false }));
	},
}));
