import { useNavigate } from 'react-router'

export default function LogOut({ setToken }) {
  const navigate = useNavigate('')

  const handleLogOut = async () => {
    localStorage.clear('token')
    setToken([])
    navigate('/')
  }

  return (
    <button type="button" onClick={() => handleLogOut()}>
      LogOut
    </button>
  )
}
