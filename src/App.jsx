import React, { useEffect, useState } from "react";
import Task from "./components/Task";
import NavBar from "./components/NavBar/index.jsx";
import TaskModificationPopup from "./components/TaskModificationPopup/index.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import searchIcon from "./assets/icons/search-svgrepo-com (2).svg";
import trashIcon from "./assets/icons/trash-svgrepo-com.svg";
import plusIcon from "./assets/icons/plus-circle-svgrepo-com.svg";
import { getData, deleteAllTasks, newTask } from "./utils/apifunctions.js";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [background, setBackground] = useState("");
  const [reload, setReload] = useState(false);
  const [taskFilter, setTaskFilter] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getData("todo", setTaskList);
    getData("groups", setGroupList);
  }, [reload]);

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
        setBackground(
          groupList.find((group) => group.name.toString() === taskFilter).color
        );

        break;
    }
  }, [taskFilter]);

  const toggleEditMode = () => setEditMode(!editMode);
  const forceReload = () => setReload(!reload);
  const filterTasks = (filter) => setTaskFilter(filter);

  return (
    <div className={`viewport ${background}`}>
      <NavBar
        filterTasks={filterTasks}
        groupList={groupList}
        setGroupList={setGroupList}
        forceReload={forceReload}
      />
      <main>
        {editMode && <TaskModificationPopup toggleEditMode={toggleEditMode} />}
        <h1 className="viewportGroupName">{taskFilter}</h1>
        <div className="searchBar">
          <img src={searchIcon} alt="Icono de búsqueda" />
          <input className="searchInput" type="text" placeholder="Buscar" />
        </div>

        <AnimatePresence>
          {taskList &&
            taskList
              .filter((task) => {
                if (taskFilter === "Papelera") {
                  return task.deleted;
                } else {
                  return (
                    !task.deleted &&
                    ((!taskFilter && !task.done) ||
                      (taskFilter === "Tareas finalizadas" && task.done) ||
                      (taskFilter &&
                        task.group &&
                        task.group.includes(taskFilter)))
                  );
                }
              })
              .map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  forceReload={forceReload}
                  toggleEditMode={toggleEditMode}
                  groupList={groupList}
                />
              ))}

          {taskFilter === "Papelera" && (
            <motion.button
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
          )}
        </AnimatePresence>

        <button className="add-task" onClick={newTask}>
          <img className="add-task" src={plusIcon} alt="Icono de crear tarea" />
        </button>
      </main>
    </div>
  );
};

export default App;
