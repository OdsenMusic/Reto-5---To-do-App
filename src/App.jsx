import React, { useEffect, useState } from "react";
import Task from "./components/Task";
import NavBar from "./components/NavBar/index.jsx";
import TaskModificationPopup from "./components/TaskModificationPopup/index.jsx";
import { AnimatePresence } from "framer-motion";
import "./index.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [background, setBackground] = useState("");
  const [reload, setReload] = useState(false);
  const [taskFilter, setTaskFilter] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getTasks();
    getGroups();
  }, [reload]);

  const toggleEditMode = () => setEditMode(!editMode);
  const forceReload = () => setReload(!reload);
  const filterTasks = (group) => setTaskFilter(group);

  const clickHandlerPersonalize = () => {
    const backgrounds = ["", "cubic", "triangular", "zigzag", "tablecloth"];
    const currentIndex = backgrounds.indexOf(background);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    setBackground(backgrounds[nextIndex]);
  };

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
      <NavBar
        filterTasks={filterTasks}
        groupList={groupList}
        setGroupList={setGroupList}
        forceReload={forceReload}
      />
      <main>
        <AnimatePresence>
          {editMode && (
            <TaskModificationPopup toggleEditMode={toggleEditMode} />
          )}
        </AnimatePresence>
        {taskList
          .filter(
            (task) => taskFilter === "" || task.group.includes(taskFilter)
          )
          .map((task) => (
            <Task
              key={task.id}
              {...task}
              forceReload={forceReload}
              toggleEditMode={toggleEditMode}
              groupList={groupList}
            />
          ))}
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
