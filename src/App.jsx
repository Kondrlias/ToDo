import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Header from './components/Header'
import InputTask from './components/InputTask'
import ShowTasks from './components/ShowTasks'
useEffect

function App() {
  const { tasks } = useSelector((store) => store.tasks)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  return (
    <>
      <Header />
      <InputTask />
      <ShowTasks />
    </>
  )
}

export default App
