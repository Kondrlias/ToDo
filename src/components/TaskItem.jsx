import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkTask, editTask } from '../redux/slises/tasksSlice'
import { DeleteButton } from './shared/deleteButton'
import DoneCheacked from './shared/DoneCheacked'
import InputTitle from './shared/InputTitle'

const TaskItem = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editText, setEditText] = useState(task.title)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setEditText(task.title)
  }, [task.title])

  const handleEdit = () => {
    if (!editText.trim()) {
      setError('Задание не должно быть пустым')
      return
    }
    dispatch(editTask({ id: task.id, title: editText }))
    setError('')
    setIsEdit(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    }

    if (e.key === 'Escape') {
      setEditText(task.title)
      setError('')
      setIsEdit(false)
    }
  }
  return (
    <div className="">
      {!isEdit ? (
        <div className=" flex gap-5 items-center justify-between mt-2 mb-2">
          <div className="flex gap-8 items-center">
            <DoneCheacked id={task.id} isDone={task.isDone} />
            <p
              className={task.isDone ? 'isDone' : ''}
              onClick={() => dispatch(checkTask(task.id))}
            >
              {task.title}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <button onClick={() => setIsEdit(true)}>✍🏻</button>
            <DeleteButton id={task.id} />
          </div>
        </div>
      ) : (
        <div>
          {error && <p className="text-red-500 text-xs w-3/4">{error}</p>}
          <div className="flex mt-2 mb-2 gap-2.5">
            <InputTitle
              title={editText}
              onChange={(e) => setEditText(e.target.value)}
              handleKeyDown={handleKeyDown}
            />
            <button onClick={handleEdit}>Save</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
