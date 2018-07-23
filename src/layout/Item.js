import React from "react"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"

class ItemLayout {
  @observable styles = {}
  @observable element = null
  @observable template = `
    <Comment>
      Hi!
    </Comment>
  `

  @computed get root() {
    return observer(props => <div style={{...this.styles}} {...props} />)
  }
}

export default ItemLayout
