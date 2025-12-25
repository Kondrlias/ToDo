import { useEffect, useState } from 'react'

const Task = ({ task, deleteTask, isDoneCheacked, editTitle }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editText, setEditText] = useState(task.title)
  const [error, setError] = useState('')

  useEffect(() => {
    setEditText(task.title)
  }, [task.title])

  const saveEdit = () => {
    if (!editText.trim()) {
      setError('Задание не должно быть пустым')
      return
    }
    editTitle(task.id, editText.trim())
    setError('')
    setIsEdit(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()

    if (e.key === 'Escape') {
      setEditText(task.title)
      setError('')
      setIsEdit(false)
    }
  }

  return (
    <div>
      {!isEdit ? (
        <div className="flex gap-5 items-center justify-between">
          <div className="flex gap-8 items-center">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() =>
                isDoneCheacked(task.id, task.isCompleted)
              }
            />

            <p className={task.isCompleted ? 'isDone' : ''}>
              {task.title}
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button onClick={() => setIsEdit(true)}>
              Изменить
            </button>
            <button onClick={() => deleteTask(task.id)}>
              ❌
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="mr-5 w-3/4"
          />

          <button onClick={saveEdit}>Сохранить</button>
        </div>
      )}
    </div>
  )
}

export default Task
