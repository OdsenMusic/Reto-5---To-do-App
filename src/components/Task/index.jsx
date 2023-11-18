import React, { useState } from "react";
import Checkbox from "../Checkbox";
import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import style from "./styles.module.css";
import { motion, easeInOut } from "framer-motion";

export default function Task({ key, id, text, color, done, forceReload }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateX: 100 }}
      animate={{ opacity: 1, scale: 1, translateX: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      layout
      className={style.taskWrapper}
    >
      <ColorSelector key={key} id={id} forceReload={forceReload} />
      <article className={style[color]}>
        <textarea maxLength="40" value={text} contentEditable={true} />
        <TaskMenu key={key} id={id} forceReload={forceReload} />
      </article>
      <Checkbox key={key} id={id} done={done} />
    </motion.div>
  );
}
