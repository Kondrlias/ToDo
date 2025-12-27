import { useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import './App.css'
import NoContent from './components/NoContent'
import LogIn from './components/User/LogIn'
import Registration from './components/User/Registration'
import Thanks from './components/User/ThanksRegister'
import UserTasks from './components/UserTasks'


const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token')
  return isAuth ? <Outlet /> : <Navigate to="/" replace />
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn token={token} setToken={setToken} />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<PrivateRoute token={token} />}>
          <Route
            path="/usertasks"
            element={<UserTasks token={token} setToken={setToken} />}
          />
        </Route>
        <Route path="*" element={<NoContent />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </>
  )
}

export default App
