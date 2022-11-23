import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds: any =
        reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const onSubmit = (e: any, text: string) => {
        console.log(e.currentTarget.id);
        console.log(text);
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === e.currentTarget.id) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              node.data = {
                ...node.data,
                label: text,
              };
            }
            return node;
          })
        );
      };

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "New Node", onSubmit: onSubmit },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const resetData = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const exportData = () => {
    const data: any = [];
    data.push({ nodes });
    data.push({ edges });
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  const importData = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const fileResult: any = e.target?.result;
      const parseResult = JSON.parse(fileResult);
      setNodes(parseResult[0].nodes);
      setEdges(parseResult[1].edges);
    };
  };

  return (
    <>
      <ReactFlowProvider>
        <div className={styles.flow} ref={reactFlowWrapper}>
          <SideBar
            resetData={resetData}
            exportData={exportData}
            importData={importData}
          />
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
            snapToGrid
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
