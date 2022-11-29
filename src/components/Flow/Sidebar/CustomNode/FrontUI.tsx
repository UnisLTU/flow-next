import Image from 'next/image'
import React, { MouseEventHandler } from 'react'
import { Handle, Position } from 'reactflow'
import styles from "../../../../styles/FrontUI.module.css"

interface Props {
    dataLabel: string,
    dataBgColor: string,
    dataUrl: string,
    changeShow: MouseEventHandler,
  }

const FrontUI = ({dataLabel, dataBgColor,dataUrl,changeShow}: Props) => {
  return (
    <div
          style={{ backgroundColor: dataBgColor }}
          className={styles.customNode}
          onDoubleClick={changeShow}
        >
          <Handle type="target" position={Position.Top} />
          <div>
            <strong>{dataLabel}</strong>
          </div>
          {dataUrl ? (
            <div className={styles.imgDiv}>
              <Image alt="img" src={dataUrl} sizes="100vw" layout="fill" />
            </div>
          ) : (
            <div className={styles.NoImgDiv}></div>
          )}

          <Handle type="source" position={Position.Bottom} />
        </div>
  )
}

export default FrontUI