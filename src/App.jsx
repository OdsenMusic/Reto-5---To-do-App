import AddTaskButton from "./components/AddTaskButton";
import Task from "./components/Task";
import React, { useState } from "react";
import NavBar from "./components/NavBar/index.jsx";
import "./styles.css";

const App = () => {
  function taskObject(description) {
    this.description = description;
  }

  const [taskList, setTaskList] = useState([]);

  let clickHandlerAddTask = () => {
    let task = new taskObject("");

    setTaskList((previo) => {
      return [...previo, task];
    });
    console.log(taskList);
  };

  return (
    <div className="viewport">
      <NavBar />
      <main>
        {taskList.map((t) => {
          return <Task />;
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
