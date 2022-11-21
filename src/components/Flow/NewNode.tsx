import React from 'react'
import styles from '../../styles/NewNode.module.css'

export const NewNode = () => {
    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
      };
  return (
    <div
    className={styles.node}
      onDragStart={(event) => onDragStart(event, "custom")}
      draggable
    >
      Add New Node
    </div>
  )
}
