import React from "react";
import styles from '../../styles/SideBar.module.css'

const SideBar = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div>
        You can drag these nodes to the pane on the right.
      </div>
      <div
      className={styles.node}
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        Add New Node
      </div>
    </aside>
  );
};

export default SideBar;
