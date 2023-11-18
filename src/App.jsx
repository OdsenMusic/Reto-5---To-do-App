import AddTaskButton from "./components/AddTaskButton";
import Task from "./components/Task";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/index.jsx";
import "./index.css";
import TaskModificationPopup from "./components/TaskModificationPopup/index.jsx";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [background, setBackground] = useState("");
  const [reload, setReload] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskFilter, setTaskFilter] = useState("");

  useEffect(() => {
    getTasks();
  }, [reload]);

  useEffect(() => {
    getGroups();
  }, [reload]);

  function forceReload() {
    setReload(!reload);
  }

  const getGroups = async () => {
    try {
      const response = await fetch("http://localhost:3000/groups");
      if (response.ok) {
        const json = await response.json();
        setGroupList(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function toggleEditMode() {
    setEditMode(!editMode);
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

  function filterTasks(group) {
    setTaskFilter(group);
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
      <NavBar filterTasks={filterTasks} />
      <main>
        <AnimatePresence>
          {editMode && (
            <TaskModificationPopup toggleEditMode={toggleEditMode} />
          )}
        </AnimatePresence>
        {taskList &&
          taskList
            .filter((e) => {
              return taskFilter === "" ? e : e.group.includes(taskFilter);
            })
            .map((e) => {
              return (
                <Task
                  id={e.id}
                  key={e.id}
                  text={e.text}
                  color={e.color}
                  done={e.done}
                  group={e.group}
                  forceReload={forceReload}
                  toggleEditMode={toggleEditMode}
                  groupList={groupList}
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
