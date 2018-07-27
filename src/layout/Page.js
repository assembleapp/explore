import React from "react"
import styled from "styled-components"
import { observable, action, computed } from "mobx"
import { observer } from "mobx-react"
import { DropTarget } from "react-dnd"
import ListLayout from "./List"

const ListDropTarget = {
  drop(props, monitor) {
    // This check makes sure we don't respond
    // if the drop was meant for a sub-component.
    if(monitor.isOver())
      props.onDrop(monitor.getItem().list)
  }
}

/* Displays multiple layouts on the page. */
class PageLayout {
  @observable styles = {}
  @observable layouts = []

  @action
  display(layout) {
    this.layouts.push(layout)
  }

  @computed get root() {
    return observer(props => <RootElement
        style={{...this.styles}}
        {...props}
        onDrop={items => {
          let list = new ListLayout()
          list.items = items
          this.layouts.push(list)
        }}
    />)
  }
}

@observer
@DropTarget(
  "list",
  ListDropTarget,
  (connect, monitor) => ({ connect: connect.dropTarget(), isHovering: monitor.isOver({ shallow: true }) })
)
class RootElement extends React.Component {
  render = () => (
      this.props.connect(
        <div style={this.props.style} >
          {this.props.children}

          { this.props.isHovering
            ? <div><DropZone/></div>
            : null
          }
        </div>
    )
  )
}

const DropZone = styled.div`
  border: 2px dashed grey;
  content: "+";
  height: 2rem;
`

export default PageLayout
