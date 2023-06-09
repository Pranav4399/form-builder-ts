import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";

//Importing constants
import { COMPONENT_MIN_SIZE, COMPONENT, SUBSECTION, CANVAS } from "../Helpers/constants";

//Importing Components
import DropZone from "../DropZone/DropZone";
import Component from "../Component/Component";

//Importing Helper functions
import { getAvailableSize } from "../Helpers/helpers";

//Importing types file
import ISubsectionProps from "./types";
import { Resizable, ResizableBox } from "react-resizable";

const style = {};
const SubSection:React.FC<ISubsectionProps> = ({ data, handleDrop, handleResize, allowDrag, setAllowDrag, path, sectionSize }) => {
  const ref = useRef(null);
  //Calling the function that adds all the component's size and subtracts it from the subsection's size to find the available size inside the subsection
  let availableSize = getAvailableSize(data);

  
  const [dimensions, setDimensions] = 
    useState({ width: 0, height: 0 });
    useEffect(() => {
      if (refContainer.current) {
        setDimensions({
          width: refContainer.current.offsetWidth,
          height: refContainer.current.offsetHeight,
        });
      }
    }, []);


  const [{ isDragging }, drag] = useDrag({
    type: SUBSECTION,
    canDrag: allowDrag,
    item: {
      type: SUBSECTION,
      id: data.id,
      children: data.children,
      path: path,
      origin: CANVAS
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component: any, currentPath: number[], subSectionSize: number) => {
    return (
      <Component
        key={component.id}
        data={component}
        path={currentPath}
        allowDrag={allowDrag}
        setAllowDrag={setAllowDrag}
        subSectionSize={subSectionSize}
      />
    );
  };

  let cummulativeSize = 0;
  let newLineflag = false;

  const refContainer = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{ ...style, opacity, flex: data.size/sectionSize }}
      className="base draggable subSection"
    >
      <div className="subSectionLabel">{data.id}{' '}{data.size}</div>
      <div className="componentContainer" ref={refContainer}>
      {data.children.map((component, index) => {
        newLineflag = false;

        const currentPath = [...path, index];
        const siblingPath = [...path, index + 1];
         
        cummulativeSize+=component.size;
        if(cummulativeSize > data.size) {
          cummulativeSize -= data.size;
          newLineflag = true;
        }

        return (
          <React.Fragment key={component.id}>
            {(newLineflag === true) && <><div className="separator"></div></>}
              <div className="componentAtomContainer" style={{ flex: component.size/data.size }}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                  type: COMPONENT,
                  availableSize: Math.max(availableSize, COMPONENT_MIN_SIZE)
                }}
                onDrop={handleDrop}
                availableSize={Math.max(availableSize, COMPONENT_MIN_SIZE)}
                className="horizontalDrag"
              />
              {(component.size>3) && <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                  type: COMPONENT,
                  modify: true,
                  availableSize: component.size/2
                }}
                onDrop={handleDrop}
                availableSize={component.size/2}
                className="horizontalDrag"
              />}
              {renderComponent(component, currentPath, data.size)}
              {(component.size>3) && <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                  type: COMPONENT,
                  modify: true,
                  availableSize: component.size/2
                }}
                onDrop={handleDrop}
                availableSize={component.size/2}
                className="horizontalDrag"
              />}
              <DropZone
                data={{
                  path: siblingPath,
                  childrenCount: data.children.length,
                  type: COMPONENT,
                  availableSize: Math.max(availableSize, COMPONENT_MIN_SIZE)
                }}
                onDrop={handleDrop}
                availableSize={Math.max(availableSize, COMPONENT_MIN_SIZE)}
                className="horizontalDrag"
              />
              <ResizableBox className="resizable-box" width={dimensions.width*(component.size/data.size)} height={dimensions.height}
              maxConstraints={[dimensions.width, dimensions.height]}
              minConstraints={[dimensions.width*(2/data.size), dimensions.height]}
              draggableOpts={{grid: [dimensions.width*(2/data.size), 0]}}
              resizeHandles={['e','w']}
              onResizeStart={(event, {node, size, handle}) => setAllowDrag(false)}
              onResizeStop={(event, {node, size, handle}) => {handleResize(size.width, dimensions.width, data.size, currentPath)}}></ResizableBox>
              </div>
          </React.Fragment>
        );
      })}
      {(availableSize > 0) && <DropZone
          style={{ flex: availableSize / data.size }}
          data={{
            path: [...path, data.children.length],
            childrenCount: data.children.length,
            type: COMPONENT,
            availableSize: Math.max(availableSize, COMPONENT_MIN_SIZE)
          }}
          onDrop={handleDrop}
          availableSize={Math.max(availableSize, COMPONENT_MIN_SIZE)}
          className="horizontalDrag"
          isLast />}
      </div>
    </div>
  );
};
export default SubSection;
