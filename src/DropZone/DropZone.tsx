import React from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

//Importing Constants
import { COMPONENT, SIDEBAR_ITEM, SECTION, SUBSECTION } from "../Helpers/constants";

//Importing Types file
import IDropZoneProps, { itemProps } from "./types";

//Importing Helper functions
import { canDropHelper } from "../Helpers/helpers";

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, SECTION, SUBSECTION];


const DropZone:React.FC<IDropZoneProps> = ({style, data, onDrop, isLast, className, availableSize }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item: itemProps, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item: itemProps, monitor): boolean => {
      return canDropHelper(data, item, availableSize);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  return (
    <div style={style}
      className={classNames("dropZone", { active: isActive, isLast }, className)}
      ref={drop}
    />
  );
};
export default DropZone;
