import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

const CustomNode: FC<NodeProps> = ({ data }) => {
  const [edit, setEdit] = useState(true);
  const [newMessage, setNewMessage] = useState<any>();
  const [message, setMessage] = useState<string>(data.label);

  const handleEdit = (e: React.SyntheticEvent) => {
    setEdit((prev) => !prev);
  };

  const finishEdit = () => {
    setEdit((prev) => !prev);
    console.log("nu")
    setMessage(newMessage)
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        {edit ? (
          <div id={data.id} onDoubleClick={handleEdit}>
            Message: <strong>{message}</strong>
          </div>
        ) : (
          <div>
            <textarea
              defaultValue={message}
              onChange = {(e) => setNewMessage(e.currentTarget.value)}
            />
            <button onClick={finishEdit}> Go </button>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default memo(CustomNode);
