import React from 'react';
import Canvas from "./Canvas"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

// Specify the back-end drag-and-drop handler for React DnD.
// http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html
@DragDropContext(HTML5Backend)

class App extends React.Component {
  render() {
    return (
      <div>
        <Canvas/>
      </div>
    );
  }
}

export default App;
