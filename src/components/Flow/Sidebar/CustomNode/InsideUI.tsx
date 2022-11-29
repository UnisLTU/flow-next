import React, { FormEventHandler } from "react";
import { Handle, Position } from "reactflow";
import styles from '../../../../styles/InsideUI.module.css'

interface Props {
  handleSubmit: FormEventHandler;
  id: string;
  dataBgColor: string;
  text: string;
  setText: any;
  dataUrl: string;
  onChangeColor: any;
  setUrl: any;
}

const InsideUI = ({
  handleSubmit,
  id,
  dataBgColor,
  text,
  setText,
  dataUrl,
  onChangeColor,
  setUrl,
}: Props) => {
  return (
    <div style={{ backgroundColor: dataBgColor }} className={styles.customNode}>
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Top} />
      <form id={id} onSubmit={(e) => handleSubmit(e)}>
        <label>
          <textarea
            className="nodrag"
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
        </label>
        <input
          style={{ width: "164px", marginTop: "10px" }}
          className="nodrag"
          type="text"
          placeholder="Image Url"
          defaultValue={dataUrl}
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
            onChange={onChangeColor}
          />
        </div>
      </form>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default InsideUI;
