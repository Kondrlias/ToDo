import { Route, Routes, Outlet, Navigate } from 'react-router'
import './App.css'
import LogIn from './components/pages/LogIn'
import NoContent from './components/pages/NoContent'
import Registration from './components/pages/Registration'
import Thanks from './components/pages/ThanksRegister'
import UserTasks from './components/pages/UserTasks'


const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token')
  return isAuth ? <Outlet /> : <Navigate to="/" replace />
}

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        {/* <Route path="/registration" element={<Registration />} /> */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/usertasks"
            element={<UserTasks />}
          />
        </Route>
        <Route path="*" element={<NoContent />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </>
  )
}

export default App
