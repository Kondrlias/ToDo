import { useState } from 'react'
import Task from './Task'

const ShowTasks = ({
  tasks,
  deleteTask,
  isDoneCheacked,
  editTitle,
  onDeleteTasks,
  onDeleteDoneTasks,
}) => {
  const numTask = tasks.filter((task) => !task.isDone).length
  const [sortBy, setSortBy] = useState('all')
  const [sortOrder, setSortOrder] = useState('none')

  const sortedItems = [...tasks]
    .filter(task => {
      if (sortBy === 'active') return !task.isDone
      if (sortBy === 'isDone') return task.isDone
      return task
    }).sort((a, b) => {
      if (sortOrder === 'start') return b.create - a.create
      if (sortOrder === 'end') return a.create - b.create
      return 0
    })

  if (!tasks.length) return <h2>Жду твои задачи</h2>

  return (
    <>
      <div className="task-list">
        {sortedItems.map((item) => {
          return (
            <Task
              key={item.id}
              task={item}
              deleteTask={deleteTask}
              isDoneCheacked={isDoneCheacked}
              editTitle={editTitle}
            />
          )
        })}
      </div>
      <hr className=" pb-5" />
      <div className="actions flex gap-10 pb-4">
        <p>Показать: </p>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value)
          }}
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="isDone">Готовые</option>
        </select>
      </div>
      <div className="flex gap-10 items-center pb-5">
        <p>Сортировка: </p>
        <button onClick={() => setSortOrder('start')}>Новые сначала</button>
        <button onClick={() => setSortOrder('end')}>Новые в конце</button>
      </div>
      <div className="flex gap-10 items-center">
        <p>Всего дел: {tasks.length} , осталось сделать {numTask}</p>
        <button onClick={() => onDeleteDoneTasks()}>Delete Done Tasks</button>
        <button onClick={() => onDeleteTasks()}>Delete All</button>
      </div>
    </>
  )
}

export default ShowTasks
