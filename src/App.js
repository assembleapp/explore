import React from "react"
import { observer } from "mobx-react"
import Layout from "./Layout"

@observer
class App extends React.Component {
  render() {
    return this.renderElement(this.props.layout)
  }

  renderElement(element) {
    if(element instanceof Layout)
      return (
        React.createElement(
          element.root,
          {},
          element.children.map(child => this.renderElement(child))
        )
      );
    else
      return React.createElement(element)
  }
}

export default App;
