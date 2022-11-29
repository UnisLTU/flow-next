import React from "react";
import styles from "../../../styles/SideBar.module.css";
import { NewNode } from "./NewNode/NewNode";

interface Props {
  importData: any;
  exportData: any;
  resetData: any;
}

const SideBar = ({ importData, exportData, resetData }: Props) => {
  return (
    <div className={styles.sidebar}>
      <NewNode />
      <button className={styles.reset} onClick={resetData}>
        Reset
      </button>
      <button onClick={exportData} className={styles.save}>
        Export
      </button>
      <div className={styles.import}>
        <input type="file" onChange={importData} accept="json" />
        <div>Import .json file</div>
      </div>
    </div>
  );
};

export default SideBar;
