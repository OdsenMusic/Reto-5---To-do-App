import React from "react";

export default function NavBarMenuCard({ icon, text, filterTasks }) {
  function clickHandler(text) {
    switch (text) {
      case "Tareas":
        filterTasks("");
        break;
      case "Tareas finalizadas":
        filterTasks("Tareas finalizadas");
        break;
      case "Papelera":
        filterTasks("Papelera");
        break;
    }
  }

  return (
    <section
      onClick={() => {
        clickHandler(text);
      }}
    >
      <img src={icon} />
      {text}
    </section>
  );
}
