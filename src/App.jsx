import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';
import './App.css';
import NoContent from './components/pages/NoContent';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token');
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

const Thanks = lazy(() => import('./components/pages/ThanksRegister'));
const UserTasks = lazy(() => import('./components/pages/UserTasks'));
const LogIn = lazy(() => import('./components/pages/LogIn'));
const Registration = lazy(() => import('./components/pages/Registration'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route element={<PrivateRoute />}>
            <Route path="/usertasks" element={<UserTasks />} />
          </Route>
          <Route path="/thanks" element={<Thanks />} />
          <Route path="*" element={<NoContent />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
