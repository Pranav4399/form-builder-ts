import React, { useRef } from "react";
import { useDrag } from "react-dnd";

//Importing Constants
import { COMPONENT, CANVAS } from "../Helpers/constants";

//Importing types file
import IComponentProps from "./types";

const Component:React.FC<IComponentProps> = ({ data, path }) => {
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
      style={{ opacity, flex: 1 }}
      className="component draggable"
    >
      <div>{data.id}{' '}{data.size}</div>
      <div>{data.component?.content}</div>
    </div>
  );
};
export default Component;
