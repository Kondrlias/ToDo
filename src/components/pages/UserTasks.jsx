import Header from '../Header';
import InputTask from '../InputTask';
import ShowTasks from '../ShowTasks';
import LogOut from './LogOut';

export default function UserTasks() {
  return (
    <>
      <div>
        <LogOut />
      </div>
      <>
        <Header />
        <InputTask />
        <ShowTasks />
      </>
    </>
  );
}
