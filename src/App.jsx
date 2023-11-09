import AddTaskButton from "./components/AddTaskButton";
import Task from "./components/Task";
import React, { useState } from "react";
import NavBar from "./components/NavBar/index.jsx";
import "./styles.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);

  function taskObject(description) {
    this.id = Date.now();
    this.description = description;
  }

  let clickHandlerAddTask = () => {
    setTaskList((previo) => {
      return [...previo, new taskObject("")];
    });
    console.log(
      taskList.map((e) => {
        return e.description;
      })
    );
  };

  function saveTaskText(taskId, taskText) {
    console.log(taskText);
    taskList.map((e) => {
      if ((e.id = taskId)) {
        e.description = taskText;
      }
    });
  }

  return (
    <div className="viewport">
      <NavBar />
      <main>
        {taskList.map((e) => {
          return <Task onSave={saveTaskText} />;
        })}
        <button className="add-task" onClick={clickHandlerAddTask}>
          <img
            class="add-task"
            src="/icons/plus-circle-svgrepo-com.svg"
            alt=""
          />
        </button>
      </main>
    </div>
  );
};

export default App;
