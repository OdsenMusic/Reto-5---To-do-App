import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/index.jsx";
import Task from "./components/Task";
import TaskModificationPopup from "./components/TaskModificationPopup/index.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { getData, deleteTask, newTask } from "./utils/apifunctions.js";
import "./index.css";

import trashIcon from "./assets/icons/trash-svgrepo-com.svg";
import plusIcon from "./assets/icons/plus-circle-svgrepo-com.svg";
import moonIcon from "./assets/icons/moon-svgrepo-com.svg";

const App = () => {
  // State declarations
  const [taskList, setTaskList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [background, setBackground] = useState("");
  const [taskFilter, setTaskFilter] = useState("");
  const [reload, setReload] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [theme, setTheme] = useState("");

  // Effect to fetch data
  useEffect(() => {
    getData("todo", setTaskList);
    getData("groups", setGroupList);
  }, [reload]);

  // Effect for setting background based on taskFilter
  useEffect(() => {
    switch (taskFilter) {
      case "Papelera":
        setBackground("red");
        break;
      case "Tareas finalizadas":
        setBackground("green");
        break;
      case "":
        setBackground("");
        break;
      default:
        const foundGroup = groupList.find(
          (group) => group.name.toString() === taskFilter
        );
        setBackground(foundGroup ? foundGroup.color : "");
        break;
    }
  }, [taskFilter, groupList]);

  // Handler functions
  const toggleEditMode = () => setEditMode(!editMode);
  const forceReload = () => setReload(!reload);
  const filterTasks = (filter) => setTaskFilter(filter);
  const handleTheme = () =>
    theme === "darkMode" ? setTheme("") : setTheme("darkMode");
  const deleteAllTasks = async () => {
    const tasksToDelete = taskList.filter((task) => task.deleted);
    tasksToDelete.forEach((task) => deleteTask(task.id, forceReload));
  };

  // Main JSX
  return (
    <div className={`viewport ${background} ${theme}`}>
      <NavBar
        filterTasks={filterTasks}
        groupList={groupList}
        taskList={taskList}
        setGroupList={setGroupList}
        forceReload={forceReload}
      />
      <main>
        {editMode && <TaskModificationPopup toggleEditMode={toggleEditMode} />}
        <h1 className="viewportGroupName">{taskFilter}</h1>

        <AnimatePresence>
          {taskList
            .filter((task) => taskFilterLogic(task, taskFilter))
            .map((task) => (
              <Task
                key={task.id}
                {...task}
                forceReload={forceReload}
                toggleEditMode={toggleEditMode}
                groupList={groupList}
              />
            ))}

          {renderDeleteAllButton(taskFilter, taskList, deleteAllTasks)}
        </AnimatePresence>

        <button className="add-task" onClick={() => newTask(forceReload)}>
          <img className="add-task" src={plusIcon} alt="Icono de crear tarea" />
        </button>
        <button className="toggleDarkMode" onClick={handleTheme}>
          <img
            className="toggleDarkMode"
            src={moonIcon}
            alt="Icono de crear tarea"
          />
        </button>
      </main>
    </div>
  );
};

function taskFilterLogic(task, taskFilter) {
  if (taskFilter === "Papelera") return task.deleted;
  return (
    !task.deleted &&
    ((!taskFilter && !task.done) ||
      (taskFilter === "Tareas finalizadas" && task.done) ||
      (taskFilter && task.group && task.group.includes(taskFilter)))
  );
}

function renderDeleteAllButton(taskFilter, taskList, deleteAllTasks) {
  if (taskFilter === "Papelera" && taskList.some((task) => task.deleted)) {
    return (
      <div className="deleteAllContainer">
        <motion.button
          exit={{ opacity: 0, scale: 0.5, translateX: 100 }}
          layout
          onClick={deleteAllTasks}
          className="deleteAll"
        >
          <img
            className="deleteAll"
            src={trashIcon}
            alt="Icono de eliminar todo"
          />
        </motion.button>
      </div>
    );
  }
}

export default App;
