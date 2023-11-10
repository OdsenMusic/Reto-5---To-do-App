import AddGroupButton from "../AddGroupButton";
import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../logo";
import React from "react";
import { useState } from "react";

export default function NavBar({}) {
  const [groupList, setGroupList] = useState([]);

  function groupObject() {
    this.id = Date.now();
    this.name = "";
    this.color = "white";
  }

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

  return (
    <nav>
      <Logo />
      <ul>
        <NavBarMenuCard
          text="Tareas"
          icon="src/assets/icons/clipboard-svgrepo-com (1).svg"
        />
        <NavBarMenuCard
          text="Tareas Archivadas"
          icon="src/assets/icons/align-bottom-svgrepo-com (1).svg"
        />

        <NavBarMenuCard
          text="Papelera"
          icon="src/assets/icons/trash-svgrepo-com.svg"
        />
      </ul>

      <div className="groups">
        {groupList.map((e) => {
          return <NavBarGroup onChange={saveGroup} id={e.id} key={e.id} />;
        })}
      </div>
      <button onClick={addNewGroup} className="add-group">
        <img src="/icons/plus-circle-svgrepo-com.svg" alt="" />
        Crear grupo
      </button>
    </nav>
  );
}
