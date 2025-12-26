import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import NoContent from './components/NoContent'
import LogIn from './components/User/LogIn'
import Registration from './components/User/Registration'
import Thanks from './components/User/ThanksRegister'
import UserTasks from './components/UserTasks'

function App() {
  let username
  let email
  let password
  let gender
  let age
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LogIn
              email={email}
              password={password}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <Registration
              email={email}
              password={password}
              username={username}
              age={age}
              gender={gender}
            />
          }
        />
        <Route
          path="/usertasks"
          element={
            token ? <UserTasks token={token} setToken={setToken} /> : <LogIn />
          }
        />
        <Route path="*" element={<NoContent />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </>
  )
}

export default App
