import AddGroupButton from "../AddGroupButton";
import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../logo";
import React from "react";

export default function NavBar({}) {
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

      <div class="groups">
        <NavBarGroup text="Estudios" />
        <NavBarGroup text="Comdpra" />
      </div>
      <AddGroupButton />
    </nav>
  );
}
