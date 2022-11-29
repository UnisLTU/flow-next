import React, { memo, useState, FormEvent } from "react";
import { NodeProps } from "reactflow";
import FrontUI from "./FrontUI";
import InsideUI from "./InsideUI";

const CustomNode = ({ id, data }: NodeProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>(data.label);
  const [url, setUrl] = useState<string>(data.url);

  const changeShow = () => {
    setShow(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    data.onSubmit(e, text, url);
    setShow(false);
  };

  return (
    <>
      {!show ? (
        <FrontUI
          dataLabel={data.label}
          dataBgColor={data.bgColor}
          dataUrl={data.url}
          changeShow={changeShow}
        />
      ) : (
        <InsideUI
          handleSubmit={handleSubmit}
          id={id}
          dataBgColor={data.bgColor}
          text={text}
          setText={setText}
          dataUrl={data.url}
          onChangeColor={data.onChangeColor}
          setUrl={setUrl}
        />
      )}
    </>
  );
};

export default memo(CustomNode);
