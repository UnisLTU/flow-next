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
        <div
          style={{ backgroundColor: data.bgColor }}
          className={styles.customNode}
          onDoubleClick={changeShow}
        >
          <Handle type="target" position={Position.Top} />
          <div>
            <strong>{data.label}</strong>
          </div>
          <Handle type="source" position={Position.Bottom} />
        </div>
      ) : (
        <div
          style={{ backgroundColor: data.bgColor }}
          className={styles.customNode}
        >
          <Handle type="target" position={Position.Top} />
          <Handle type="target" position={Position.Top} />
          <form id={id} onSubmit={handleSubmit}>
            <label>
              <textarea
                className="nodrag"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <div className={styles.inputs}>
              <input
                id={styles.submit}
                className="nodrag"
                type="submit"
                value="Update Node"
              />
              <input
                id={id}
                className={styles.bgColor}
                type="color"
                onChange={data.onChangeColor}
              />
            </div>
          </form>
          <Handle type="source" position={Position.Bottom} />
        </div>
      )}
    </>
  );
};

export default memo(CustomNode);
