import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import styles from "../../styles/Flow.module.css";

const CustomNode: FC<NodeProps> = ({ data }) => {
  const [edit, setEdit] = useState(true);
  const [message, setMessage] = useState<string>(data.label);
  const [newMessage, setNewMessage] = useState<string>(data.label);
  

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const finishEdit = () => {
    setEdit((prev) => !prev);
    setMessage(newMessage);
  };

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div className={styles.customNode}>
        {edit ? (
          <div id={data.id} onDoubleClick={handleEdit}>
            Message: <strong>{message}</strong>
          </div>
        ) : (
          <div>
            <textarea
              defaultValue={message}
              onChange={(e) => setNewMessage(e.currentTarget.value)}
            />
            <button onClick={finishEdit}> Go </button>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
