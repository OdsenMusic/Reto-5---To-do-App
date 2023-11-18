import AddGroupButton from "../AddGroupButton";
import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../Logo";
import React, { useEffect } from "react";
import { useState } from "react";
import style from "../NavBar/styles.module.css";

export default function NavBar({ filterTasks }) {
  const [groupList, setGroupList] = useState([]);
  const [reload, setReload] = useState(false);

  function forceReload() {
    setReload(!reload);
  }

  useEffect(() => {
    getGroups();
  }, [reload]);

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

  const addNewGroup = async (prev) => {
    try {
      const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setGroupList((prev) => {
          return [...prev, json];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={style}>
      <Logo />
      <ul>
        <NavBarMenuCard
          filterTasks={filterTasks}
          text="Tareas"
          icon="src/assets/icons/clipboard-svgrepo-com (1).svg"
        />
        <NavBarMenuCard
          text="Tareas finalizadas"
          icon="src/assets/icons/checkmark-circle-svgrepo-com (1).svg"
        />

        <NavBarMenuCard
          text="Papelera"
          icon="src/assets/icons/trash-svgrepo-com.svg"
        />
      </ul>

      <div className={style.groups}>
        {groupList.map((e) => {
          return (
            <NavBarGroup
              id={e.id}
              key={e.id}
              name={e.name}
              forceReload={forceReload}
              color={e.color}
              filterTasks={filterTasks}
            />
          );
        })}
      </div>
      <button onClick={addNewGroup} className={style.addGroup}>
        <img src="/icons/plus-circle-svgrepo-com.svg" alt="" />
        Crear grupo
      </button>
    </nav>
  );
}
