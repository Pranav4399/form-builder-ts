import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT, CANVAS } from "../Helpers/constants";
import IComponentProps from "./types";

const Component:React.FC<IComponentProps> = ({ data, path, subSectionSize }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: { type: COMPONENT, 
            id: data.id,
            path: path,
            origin: CANVAS },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);


  return (
    <div
      ref={ref}
      style={{ opacity, flex: data.size/subSectionSize }}
      className="component draggable"
    >
      <div>{data.id}{' '}{data.size}</div>
    </div>
  );
};
export default Component;
