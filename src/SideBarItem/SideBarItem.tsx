import React from "react";
import { useDrag } from "react-dnd";

//Importing constants
import { NEW, SIDEBAR_ITEM } from "../Helpers/constants";

//Importing types file
import ISideBarItemProps from "./types";

const SideBarItem:React.FC<ISideBarItemProps> = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: {...data,
      origin: NEW},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {data.component.type}
    </div>
  );
};
export default SideBarItem;
