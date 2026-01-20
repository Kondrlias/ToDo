export const editTaskAction = (id, title) => ({
  type: 'edit',
  payload: { id, title: title.trim() },
});

export const set = (text) => ({ type: 'set', payload: text });

export const checkTaskAction = (id) => ({ type: 'check', payload: id });

export const deleteTaskAction = (id) => ({ type: 'delete', payload: id });

export const deleteAllAction = () => ({ type: 'deleteAll' });
