import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logOut } from '../../redux/slices/Auth';

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logOut);
    navigate('/');
  };

  return (
    <button type="button" onClick={() => handleLogOut()}>
      LogOut
    </button>
  );
}
