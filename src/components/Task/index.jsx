import React, { useState, useEffect } from "react";
import Checkbox from "../Checkbox";
import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import style from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Task({
  id,
  text,
  color,
  done,
  group,
  forceReload,
  toggleEditMode,
  groupList,
}) {
  const [colorSelectorVisibility, setColorSelectorVisibility] = useState(false);

  useEffect(() => {
    if (colorSelectorVisibility) {
      const timer = setTimeout(() => {
        setColorSelectorVisibility(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [colorSelectorVisibility]);

  const changeTaskAttribute = async (attribute, value) => {
    const payload = { [attribute]: value };
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleTextChange = (event) => {
    changeTaskAttribute("text", event.target.value);
  };

  const handleColorSelectorVisibility = () => {
    setColorSelectorVisibility(!colorSelectorVisibility);
  };

  let completed = "";

  if (done) {
    completed = style.completed;
  } else {
    completed = "";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateX: 100 }}
      animate={{ opacity: 1, scale: 1, translateX: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      exit={{ opacity: 0, scale: 0.5, translateX: 100 }}
      layout
      className={style.taskWrapper}
    >
      <AnimatePresence>
        {colorSelectorVisibility && (
          <ColorSelector id={id} forceReload={forceReload} />
        )}
      </AnimatePresence>
      <article className={`${style[color]} ${completed}`}>
        <textarea
          defaultValue={text}
          onBlur={handleTextChange}
          className={style.taskText}
        />
        <TaskMenu
          id={id}
          forceReload={forceReload}
          toggleEditMode={toggleEditMode}
          groupList={groupList}
          group={group}
          changeTaskAttribute={changeTaskAttribute}
          handleColorSelectorVisibility={handleColorSelectorVisibility}
        />
      </article>
      <Checkbox id={id} done={done} forceReload={forceReload} />
    </motion.div>
  );
}
