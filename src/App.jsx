import AddTaskButton from "./components/AddTaskButton";
import Task from "./components/Task";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/index.jsx";
import "./index.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [background, setBackground] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getTasks();
  }, [reload]);

  function forceReload() {
    setReload(!reload);
  }

  function taskObject() {
    this.id = Date.now();
    this.description = "";
    this.group = "";
    this.color = "white";
    this.completed = false;
    this.archived = false;
  }

  let clickHandlerPersonalize = () => {
    switch (background) {
      case "":
        setBackground("cubic");
        break;
      case "cubic":
        setBackground("triangular");
        break;
      case "triangular":
        setBackground("zigzag");
        break;
      case "zigzag":
        setBackground("tablecloth");
        break;
      case "tablecloth":
        setBackground("");
        break;
    }
  };

  function saveTaskText(taskText, taskId) {
    let exactTask = taskList.find((task) => task.id === taskId);
    exactTask.description = taskText;
  }

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo");
      if (response.ok) {
        const json = await response.json();
        setTaskList(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newTask = async (prev) => {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setTaskList((prev) => {
          return [...prev, json];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`viewport ${background}`}>
      <NavBar />
      <main>
        {taskList &&
          taskList.map((e) => {
            return (
              <Task
                id={e.id}
                key={e.id}
                text={e.text}
                color={e.color}
                done={e.done}
                forceReload={forceReload}
                onClick={() => {
                  console.log("hoal");
                }}
              />
            );
          })}
        <button className="add-task" onClick={newTask}>
          <img
            className="add-task"
            src="/icons/plus-circle-svgrepo-com.svg"
            alt=""
          />
        </button>
        <button className="personalize" onClick={clickHandlerPersonalize}>
          <img
            className="add-task"
            src="src/assets/icons/brush-svgrepo-com.svg"
            alt=""
          />
        </button>
      </main>
    </div>
  );
};

export default App;
