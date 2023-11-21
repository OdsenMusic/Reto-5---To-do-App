import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../Logo";
import style from "../NavBar/styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar({
  filterTasks,
  forceReload,
  groupList,
  setGroupList,
}) {
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
        <AnimatePresence>
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
        </AnimatePresence>
      </div>
      <button onClick={addNewGroup} className={style.addGroup}>
        <img
          className={style.addGroup}
          src="/icons/plus-circle-svgrepo-com.svg"
          alt=""
        />
        Crear grupo
      </button>
    </nav>
  );
}
