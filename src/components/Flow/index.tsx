import React, { SyntheticEvent, useCallback, useRef, useState } from "react";
import ReactFlow, {
  Node,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
  Controls,
} from "reactflow";
import CustomNode from "./CustomNode";

import styles from "../../styles/Flow.module.css";
import SideBar from "./SideBar";

let id = 2;
const getId = () => `${id++}`;

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<ReactFlow>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<ReactFlow>(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlow>(null);

  
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds: ReactFlow) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: ReactFlow) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: ReactFlow) => {
      event.preventDefault();

      const reactFlowBounds:ReactFlow = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "New Node" },
      };

      setNodes((nds: ReactFlow) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const resetData: ReactFlow = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const data:any = []

  data.push({allnodes: nodes[0]})
  data.push({alledges: edges[0]})

  console.log(data)

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  return (
    <>
      <ReactFlowProvider>
        <div className={styles.flow} ref={reactFlowWrapper}>
          <SideBar resetData={resetData} exportData={exportData}/>
          <ReactFlow
            deleteKeyCode={["Backspace", "Delete"]}
            onInit={setReactFlowInstance}
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
          <Controls />
        </div>
      </ReactFlowProvider>
    </>
  );
}

export default Flow;
