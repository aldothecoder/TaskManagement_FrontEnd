import { useLocation } from "react-router-dom";
import "./Tasks.css";
import axios from "axios";
import { useState } from "react";

export default function Tasks() {
  const location = useLocation();
  const [tasks, setTasks] = useState(location.state?.tasks || []);

  console.log("Tasks received in TasksPage:", tasks); // This should log the array of tasks

  const handleDelete = (taskId) => {
    axios
      .delete(`/tasks/${taskId}`)
      .then(() => {
        console.log("Task deleted.");

        axios
          .get(`/user/tasks/${tasks[0].user.id}`)
          .then((tasksResponse) => {
            setTasks(tasksResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching tasks after deletion.");
          });
      })
      .catch((error) => {
        console.error("error deleting task", error);
      });
  };

  return (
    <div className="tasksContainer">
      <h1>
        {tasks.length > 0 &&
          `${tasks[0].user.first_name} ${tasks[0].user.last_name}'s Tasks`}
      </h1>
      {tasks && tasks.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}
