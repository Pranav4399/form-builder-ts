import React, { useState, useCallback } from "react";

//Importing Components
import DropZone from "../DropZone/DropZone"
import SideBarItem from "../SideBarItem/SideBarItem";
import Section from "../Section/Section";

//Importing InitialData
import initialData from "../Helpers/initial-data";

//Importing Helper Functions
import {
  handleDropEvent
} from "../Helpers/helpers";

//Importing Types file
import IBuilderProps, { dropZoneProps, itemProps} from "./types";

import { SIDEBAR_ITEMS, SUPERSECTION, SECTION, SUPERSECTION_SIZE } from "../Helpers/constants";

const Builder:React.FC<IBuilderProps> = () => {
  const initialLayout = initialData.layout;
  const [layout, setLayout] = useState(initialLayout);
  
  const handleDrop = useCallback(
    (dropZone: dropZoneProps, item: itemProps) => {
      setLayout([...handleDropEvent(layout, dropZone, item)]);
      return;
    },
    [layout]
  );

  const renderSection = (section: any, currentPath: number[]) => {
    return (
      <Section
        key={section.id}
        data={section}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((el, supersectionindex) => {

            let availableSize = SUPERSECTION_SIZE;

            return <>
              <DropZone
                data={{
                  path: [supersectionindex],
                  childrenCount: el.children.length,
                  type: SUPERSECTION,
                  availableSize: SUPERSECTION_SIZE
                }}
                onDrop={handleDrop}
                availableSize={SUPERSECTION_SIZE}
                path={[supersectionindex]}
              />
              <div className="sectionContainer">
                {el.children.map((section, index) => {

                  availableSize-= section.size;
                  

                  return (
                    <React.Fragment key={section.id}>
                      {renderSection(section, [supersectionindex, index])}
                    </React.Fragment>
                  );
                })}
                {(availableSize > 0) && 
                <DropZone 
                  style={{ flexGrow : availableSize/SUPERSECTION_SIZE }}
                  data={{
                    path: [supersectionindex, el.children.length],
                    childrenCount: el.children.length,
                    type: SECTION,
                    availableSize: availableSize
                  }}
                  className="horizontalDrag"
                  onDrop={handleDrop}
                  availableSize={availableSize}
                  isLast
                />}
              </div>
            </>
          })}
          
          <DropZone
            data={{
              path: [layout.length],
              childrenCount: layout.length,
              type: SUPERSECTION,
              availableSize: SUPERSECTION_SIZE
            }}
            onDrop={handleDrop}
            availableSize={SUPERSECTION_SIZE}
            isLast
          />
        </div>

      </div>
    </div>
  );
};
export default Builder;
