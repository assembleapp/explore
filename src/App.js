import React from "react"
import { observer } from "mobx-react"

import ItemLayout from "./layout/Item"
import ListLayout from "./layout/List"
import PageLayout from "./layout/Page"

@observer
class App extends React.Component {
  render() {
    return this.renderElement(this.props.layout)
  }

  renderElement(element) {
    if(element instanceof PageLayout)
      return (
        React.createElement(
          element.root,
          {},
          element.layouts.map(layout => this.renderElement(layout))
        )
      );
    else if(element instanceof ListLayout)
      return (
        React.createElement(
          element.root,
          {},
          element.items.map(item =>
            this.renderElement(element.template(item))
          )
        )
      )
    else if(element instanceof ItemLayout) {
      return (
        element.element
        ? React.createElement(
            element.root,
            {},
            this.renderElement(element.template(element.element))
          )
        : null
      )
    }
    else if(element instanceof React.Component)
      return React.createElement(element)
    else
      return element
  }
}

export default App;
