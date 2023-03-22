import React, {FC, PropsWithChildren} from "react";
import ReactDOM from "react-dom";
import Builder from "./Builder/Builder"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./styles.scss";



const App = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div>
        <Builder />
        </div>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
