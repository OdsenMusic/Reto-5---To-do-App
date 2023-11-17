import AddGroupButton from "../AddGroupButton";
import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../Logo";
import React, { useEffect } from "react";
import { useState } from "react";
import style from "../NavBar/styles.module.css";

export default function NavBar({}) {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

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

  function addNewGroup(prev) {
    setGroupList((prev) => {
      return [...prev, new groupObject()];
    });

    console.log(groupList);
  }

  function saveGroup(groupName, groupId) {
    console.log(groupName);

    let exactGroup = groupList.find((group) => group.id === groupId);
    exactGroup.name = groupName;

    console.log(exactGroup);
  }

  function deleteGroup(value, groupId) {
    let exactGroup = groupList.findIndex((group) => group.id === groupId);
    setGroupList(groupList.splice(exactGroup, 1));
  }

  return (
    <nav className={style}>
      <Logo />
      <ul>
        <NavBarMenuCard
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
              onChange={saveGroup}
              id={e.id}
              key={e.id}
              name={e.name}
              onClick={deleteGroup}
              color={e.color}
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
