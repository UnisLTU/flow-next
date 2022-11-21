import React from "react";
import styles from "../../styles/SideBar.module.css";
import { NewNode } from "./NewNode";

const SideBar = (props: any) => {
  return (
    <div className={styles.sidebar}>
      <NewNode />
      <button className={styles.reset} onClick={props.resetData}>
        Reset
      </button>
      <button className={styles.save}>Save</button>
    </div>
  );
};

export default SideBar;
