import AddTaskButton from "./components/AddTaskButton";
import Task from "src/components/Task/index.jsx";
import React, { useState } from "react";
import NavBar from "./components/NavBar/index.jsx";
import "./styles.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);

  function taskObject() {
    this.id = Date.now();
    this.description = "";
    this.group = "";
    this.color = "white";
    this.completed = false;
    this.archived = false;
  }

  let clickHandlerAddTask = () => {
    setTaskList((prev) => {
      return [...prev, new taskObject("")];
    });
  };

  function saveTaskText(taskText, taskId) {
    console.log(taskText);
    console.log(taskId);

    let exactTask = taskList.find((task) => task.id === taskId);
    exactTask.description = taskText;

    console.log(exactTask);
  }

  return (
    <div className="viewport">
      <NavBar />
      <main>
        {taskList.map((e) => {
          return <Task id={e.id} key={e.id} onSave={saveTaskText} />;
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
