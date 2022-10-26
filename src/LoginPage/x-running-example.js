import React, { useEffect } from 'react';

import { apiTasks } from '@/services/api';

export function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    _getTasks();
  }, []);

  function _getTasks() {
    apiTasks.getAll().then((res) => {
      let arr = _parseTasks(res.results.data);
      setTasks(arr);
    });
  }

  function _parseTasks(tasks) {
    return tasks.map((task) => {
      // Parse task information
      return task;
    });
  }

  function _createTask(task) {
    apiTasks.post(task).then((res) => {
      // state logic
    });
  }

  function _updateTask(task) {
    apiTasks.patch(task).then((res) => {
      // state logic
    });
  }

  function _removeTask(id) {
    apiTasks.remove(id).then((res) => {
      // state logic
    });
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
}