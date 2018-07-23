import React from "react"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"

class ListLayout {
  @observable styles = {}
  @observable items = []
  @observable template = `
    <Comment>
      {JSON.stringify(item)}
    </Comment>
    `

  @computed get root() {
    return observer(props => <div style={{...this.styles}} {...props} />)
  }
}

export default ListLayout
