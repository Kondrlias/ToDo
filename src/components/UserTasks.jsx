import { Spin } from 'antd';
import 'antd/dist/reset.css';
import { useEffect, useState } from 'react';
import Header from './Header';
import InputTask from './InputTask';
import ShowTasks from './ShowTasks';
import LogOut from './User/LogOut';

export default function UserTasks({ token, setToken }) {
  const [loading, setLoading] = useState(false);
  const [tasks, setTask] = useState([]);

  const getAllTasks = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/todos',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setTask([...data]);
    } catch (error) {
      console.log('error: ', error.message);
    } finally {
      setLoading(false); // конец загрузки
    }
  };

  useEffect(() => {
    getAllTasks(token);
  }, []);

  const deleteTask = async (id) => {
    try {
      await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTask((tasks) => tasks.filter((item) => item.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const isDoneCheacked = async (id, currentValue) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isCompleted: !currentValue,
          }),
        }
      );
      const data = await response.json();
      setTask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !currentValue } : task
        )
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const editTitle = async (id, editText) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: `${editText}`,
          }),
        }
      );
      const data = await response.json();
      setTask((tasks) =>
        tasks.map((task) => (task.id === data.id ? data : task))
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleDeleteTasks = async () => {
    try {
      await Promise.all(
        tasks.map((task) =>
          fetch(`https://todo-redev.herokuapp.com/api/todos/${task.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        )
      );
      setTask([]);
    } catch (error) {
      console.log('error deleting all tasks:', error.message);
    }
  };

  const handleDeleteDoneTasks = async () => {
    try {
      const doneTasks = tasks.filter((task) => task.isCompleted);
      await Promise.all(
        doneTasks.map((task) =>
          fetch(`https://todo-redev.herokuapp.com/api/todos/${task.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        )
      );
      setTask((tasks) => tasks.filter((task) => !task.isCompleted));
    } catch (error) {
      console.log('error deleting done tasks:', error.message);
    }
  };

  return (
    <>
      <div>
        <LogOut setToken={setToken} />
      </div>
      <Header />
      <InputTask token={token} setTask={setTask} />
      {loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <ShowTasks
          tasks={tasks}
          deleteTask={deleteTask}
          isDoneCheacked={isDoneCheacked}
          editTitle={editTitle}
          onDeleteTasks={handleDeleteTasks}
          onDeleteDoneTasks={handleDeleteDoneTasks}
          token={token}
        />
      )}
    </>
  );
}
