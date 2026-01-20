const loadTasks = () => {
  try {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialValue = {
  tasks: loadTasks(),
};

const tasksReducer = (store = initialValue, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...store,
        tasks: [
          ...store.tasks,
          { id: crypto.randomUUID(), title: action.payload, isDone: false },
        ],
      };
    case 'edit':
      return {
        ...store,
        tasks: store.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };
    case 'check':
      return {
        ...store,
        tasks: store.tasks.map((task) =>
          task.id === action.payload ? { ...task, isDone: !task.isDone } : task
        ),
      };
    case 'delete':
      return {
        ...store,
        tasks: store.tasks.filter((task) => task.id !== action.payload),
      };
    case 'deleteAll':
      return { ...store, tasks: [] };

    default:
      return store;
  }
};

export default tasksReducer;
