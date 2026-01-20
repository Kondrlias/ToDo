import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import NumerTasks from './shared/NumerTasks';

const ShowTasks = () => {
  const { tasks } = useSelector((store) => store.tasks);

  if (!tasks.length) return <h2>Wait your tasks...</h2>;

  return (
    <>
      <NumerTasks />
      <div className="task-list">
        {tasks.map((item) => {
          return <TaskItem key={item.id} task={item} />;
        })}
      </div>
    </>
  );
};

export default ShowTasks;
