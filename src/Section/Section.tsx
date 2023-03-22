import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { SECTION, SUPERSECTION_SIZE } from "../Helpers/constants";
import DropZone from "../DropZone/DropZone";
import SubSection from "../SubSection/SubSection";
import { SUBSECTION, CANVAS } from "../Helpers/constants";
import { getAvailableSize } from "../Helpers/helpers";
import ISectionProps from "./types";

const Section:React.FC<ISectionProps> = ({ data, handleDrop, path }) => {
  const ref = useRef(null);

  //Calling the function that adds all the subsection's size and subtracts it from the section's size to find the available size inside the section
  let availableSize = getAvailableSize(data);

  const [{ isDragging }, drag] = useDrag({
    type: SECTION,
    item: {
      type: SECTION,
      id: data.id,
      size: data.size,
      children: data.children,
      path: path,
      origin: CANVAS
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderSubSection = (subSection: any, currentPath: number[], sectionSize: number) => {
    return (
      <SubSection
        key={subSection.id}
        data={subSection}
        handleDrop={handleDrop}
        path={currentPath}
        sectionSize={sectionSize}
      />
    );
  };

  return (
    <div ref={ref} style={{ opacity, flex : data.size/SUPERSECTION_SIZE }} className="base draggable section">
      <div className="sectionLabel">{data.id}{' '}{data.size}</div>
      <div className="subSectionContainer">
        {data.children.map((subSection, index) => {
          const currentPath = [...path, index];

          return (
            <React.Fragment key={subSection.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                  type: SUBSECTION,
                  availableSize: availableSize
                }}
                onDrop={handleDrop}
                availableSize={availableSize}
                className="horizontalDrag"
              />
              {renderSubSection(subSection, currentPath, data.size)}
            </React.Fragment>
          );
        })}
        <DropZone
          style= {{flex: availableSize/data.size}}
          data={{
            path: [...path, data.children.length],
            childrenCount: data.children.length,
            type: SUBSECTION,
            availableSize: availableSize
          }}
          onDrop={handleDrop}
          availableSize={availableSize}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Section;
