import React from 'react';
import Canvas from "./Canvas"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { observer } from "mobx-react"

// Specify the back-end drag-and-drop handler for React DnD.
// http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html
@DragDropContext(HTML5Backend)

@observer
class App extends React.Component {
  render() {
    return (
      <div>
        <Canvas store={this.props.store} />
      </div>
    );
  }
}

export default App;
