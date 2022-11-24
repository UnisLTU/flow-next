import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import Image from "next/image";
import styles from "../../styles/Flow.module.css";

const CustomNode: FC<NodeProps> = ({ id, data }) => {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>(data.label);
  const [url, setUrl] = useState<string>(data.url);

  const changeShow = () => {
    setShow(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    data.onSubmit(e, text, url);
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
          {data.url ? (
            <div className={styles.imgDiv}>
              <Image alt="img" src={data.url} sizes="100vw" layout="fill" />
            </div>
          ) : (
            <div className={styles.NoImgDiv}></div>
          )}

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
            <input
              style={{ width: "164px", marginTop: "10px" }}
              className="nodrag"
              type="text"
              placeholder="Image Url"
              defaultValue={data.url}
              onChange={(e) => setUrl(e.target.value)}
            ></input>
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
