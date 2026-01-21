import { createSlice } from '@reduxjs/toolkit'

const loadTasks = () => {
	try {
		const saved = localStorage.getItem('tasks')
		const parsed = saved ? JSON.parse(saved) : []
		return Array.isArray(parsed) ? parsed : [] 
	} catch {
		return []
	}
}

const initialState = {
	tasks: loadTasks(),
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addNewTask(state, action) {
			state.tasks.push({
				id: crypto.randomUUID(),
				title: action.payload,
				isDone: false,
			})
		},
		editTask(state, action) {
			state.tasks = state.tasks.map((task) =>
				task.id === action.payload.id
					? { ...task, title: action.payload.title }
					: task
			)
		},
		checkTask(state, action) {
			state.tasks = state.tasks.map((task) =>
				task.id === action.payload ? { ...task, isDone: !task.isDone } : task
			)
		},
		deleteTask(state, action) {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload)
		},
		deleteAll(state) {
			state.tasks = []
		},
	},
})

export const { addNewTask, editTask, checkTask, deleteTask, deleteAll } = tasksSlice.actions
export default tasksSlice.reducer
