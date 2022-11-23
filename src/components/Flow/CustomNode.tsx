import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import styles from "../../styles/Flow.module.css";

const CustomNode: FC<NodeProps> = ({ id, data }) => {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>(data.label);

  const changeShow = () => {
    setShow(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    data.onSubmit(e, text);
    setShow(false);
  };
  return (
    <>
      {!show ? (
        <div onDoubleClick={changeShow}>
          <Handle type="target" position={Position.Top} />
          <div className={styles.customNode}>
            <div>
              Text: <strong>{data.label}</strong>
            </div>
          </div>
          <Handle type="source" position={Position.Bottom} />
        </div>
      ) : (
        <div className={styles.customNode}>
          <Handle type="target" position={Position.Top} />
          <form id={id} onSubmit={handleSubmit}>
            <label>
              Text:
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <input type="submit" />
          </form>
          <Handle type="source" position={Position.Bottom} />
        </div>
      )}
    </>
  );
};

export default memo(CustomNode);
