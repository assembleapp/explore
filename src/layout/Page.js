import React from "react"
import { observable, action, computed } from "mobx"
import { observer } from "mobx-react"

/* Displays multiple layouts on the page. */
class PageLayout {
  @observable styles = {}
  @observable layouts = []

  @action
  display = (layout) => {
    this.layouts.push(layout)
  }

  @computed get root() {
    return observer(props => <div style={{...this.styles}} {...props} />)
  }
}

export default PageLayout
