import shortid from "shortid";
import Button from "./Components/Button";
import Textbox from "./Components/Textbox";
import Label from "./Components/Label";

export const SIDEBAR_ITEM = "sidebarItem";
export const SUPERSECTION = "supersection";
export const SECTION = "section";
export const SUBSECTION = "subsection";
export const COMPONENT = "component";
export const SUBCOMPONENT = "subcomponent";
export const CANVAS = "canvas";
export const NEW = "new";

export const SUPERSECTION_SIZE = 12;
export const COMPONENT_MIN_SIZE = 2;

export const HIERARCHY = [SUPERSECTION, SECTION, SUBSECTION, COMPONENT];

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: COMPONENT,
    path: [],
    component: {
      type: "Button",
      content: <Button />
    }
    
  },
  {
    id: shortid.generate(),
    type: COMPONENT,
    path: [],
    component: {
      type: "Textbox",
      content: <Textbox />
    }
    
  },
  {
    id: shortid.generate(),
    type: COMPONENT,
    path: [],
    component: {
      type: "Label",
      content: <Label />
    }
    
  }
];

export const draggableOpts = {
  
}