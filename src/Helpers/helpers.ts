import shortid from "shortid";
import { NEW, HIERARCHY } from "./constants";

//--------------------------------Types------------------------------

interface dropZoneProps {
  availableSize: number,
  childrenCount: number,
  path: number[],
  type: string,
  modify?: boolean
}

interface itemProps{
  id: string,
  origin?: string,
  type: string,
  component?: {
      content: string,
      type: string
  },
  path: number[],
  children: any,
  size?: number
}

interface childrenProps{
  id: string,
  size: number,
  type: string
}

interface getAvailableSizeData{
    id: string,
    type: string,
    size: number,
    children: childrenProps[]
}

// a little function to help us with resizing the result
export const resize = (arr: childrenProps[], index: number, updatedSize: number) => {

  arr[index].size = updatedSize;

  return arr;
};


// a little function to help us with reordering the result
export const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

export const remove = (arr: childrenProps[], index: number) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1)
];

export const insert = (arr: childrenProps[], index: number, newItem: itemProps) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

export const insertModify = (arr: childrenProps[], index: number, newItem: itemProps) => {
  let itemToModify = arr[index];
    newItem.size = itemToModify.size = itemToModify.size/2;
    if(index == 0) {
      return [
        // inserted item
        newItem,
        // modified item
        itemToModify,
        // part of the array after the specified index
        ...arr.slice(index + 1)
        ];
    }
    if(index == arr.length - 1) {
      return [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // modified item
        itemToModify
        ];
    }
    return [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted item
      newItem,
      // modified item
      itemToModify,
      // part of the array after the specified index
      ...arr.slice(index + 1)
    ];
  
};

export const canDropHelper = (dropZone: dropZoneProps, item: itemProps, availableSize: number) => {
      const dropZonePath = dropZone.path;
      const itemPath = item.path;
      // check if the availableSize of dropZone is more than 0 before dropping anything
      if(availableSize < 1) {
        return false;
      }

      // sidebar items can always be dropped anywhere
      if (itemPath.length === 0) {
        return true;
      }

      // parent container cannot be dropped in child container
      if(itemPath.length < dropZonePath.length) {
        return false;
      }
      
      // prevent dropping in itself(right)  
      if(JSON.stringify([...itemPath.slice(0,-1), Number(itemPath.slice(-1)) + 1 ]) 
      === JSON.stringify(dropZonePath)) {
        return false;

      }

      // prevent dropping in itself(left)  
      if (itemPath === dropZonePath) {
        return false;
      }
      
      return true;
}


export const handleDropEvent = (layout: any, dropZone: dropZoneProps, item: itemProps) => {


  const wrapItemRecursive = (item: itemProps, targetType: string, availableSize: number) => {
    while (item.type !== targetType) {
      let curIndex = HIERARCHY.indexOf(item.type);
      item = {
        type: HIERARCHY[curIndex-1],
        id: shortid.generate(),
        path: [],
        children: [
          {
            ...item,
            size: availableSize
          }
        ]
      }

      wrapItemRecursive(item, targetType, availableSize);
    }

    item = {
      ...item,
      size: availableSize
    }
    
    return item;
  }

  const insertJSONRecursive = (layout: any, i: number, target: number) => {

    if(i !== target) {

      let layoutChildren = layout[dropZone.path[i]].children;

      layout[dropZone.path[i]].children = insertJSONRecursive(layoutChildren, ++i, target);
      return layout;
    }

    let availableSize = dropZone.availableSize;

    return dropZone.modify === true? insertModify(layout, dropZone.path[dropZone.path.length-1], wrapItemRecursive(item, dropZone.type, availableSize))
    : insert(layout, dropZone.path[dropZone.path.length-1], wrapItemRecursive(item, dropZone.type, availableSize));

  }

  const removeJSONRecursive = (layout: any, i: number, target: number) => {
    if(i !== target) {
      layout[item.path[i]].children = removeJSONRecursive(layout[item.path[i]].children, ++i, target);
      return layout;
    }

    return remove(layout, item.path[item.path.length-1]);

  }

  if(item.origin === NEW)
    return insertJSONRecursive(layout, 0, dropZone.path.length - 1);
  else {
    layout = removeJSONRecursive(layout, 0, item.path.length - 1);
    return insertJSONRecursive(layout, 0, dropZone.path.length - 1);
  }
}

export const  getAvailableSize = (data: getAvailableSizeData) => (data.size - data.children.reduce((a: number, b) => a + b.size, 0));

export const handleResizeEvent = (layout: any, itemPath: number[], updatedSize: number) => {
  console.log('here');

  const handleResizeRecursive = (layout: any, i: number, target: number) => {
    if(i!=target) {
      layout[itemPath[i]].children = handleResizeRecursive(layout[itemPath[i]].children, ++i, target);
      return layout;
    }

    return resize(layout, itemPath[i], updatedSize)
  }

  return handleResizeRecursive(layout, 0, itemPath.length-1);
}
