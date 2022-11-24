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
      <button onClick={props.exportData} className={styles.save}>
        Export
      </button>
      <div className={styles.import}>
        <input type="file" onChange={props.importData} accept="json" />
        <div>Import .json file</div>
      </div>
      
    </div>
  );
};

export default SideBar;
