import React from "react";

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
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        Node
      </div>
    </aside>
  );
};

export default SideBar;
