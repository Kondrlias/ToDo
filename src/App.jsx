import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import InputTask from './components/InputTask'
import ShowTasks from './components/ShowTasks'


function App() {

  const[tasks, setTask] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  // const [tasks, setTask] = useState([
  //   { id: 1, title: 'Test task', isDone: false, create: 1 },
  // ])


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const deleteTask = (id) => {
    setTask((tasks) => tasks.filter((item) => item.id != id))
  }

  const isDoneCheacked = (id) => {
    setTask((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    )
  }

  const editTitle = (id, newTitle) => {
    setTask((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    )
  }

  function handleDeleteTasks() {
    setTask([])
  }
  function handleDeleteDoneTasks() {
    setTask((tasks) => tasks.filter((task) => !task.isDone))
  }

  return (
    <>
      <Header />
      <InputTask setTask={setTask} deleteTask={deleteTask} />
      <ShowTasks
        tasks={tasks}
        deleteTask={deleteTask}
        isDoneCheacked={isDoneCheacked}
        editTitle={editTitle}
        onDeleteTasks={handleDeleteTasks}
        onDeleteDoneTasks={handleDeleteDoneTasks}
      />
    </>
  )
}

export default App
