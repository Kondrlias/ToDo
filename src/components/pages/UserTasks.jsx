import Header from '../Header';
import InputTask from '../InputTask';
import ShowTasks from '../ShowTasks';
import LogOut from './LogOut';

export default function UserTasks() {
  return (
    <>
      <div className="flex justify-end mb-5">
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
