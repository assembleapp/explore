import React from "react"
import styled from "styled-components"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Comment from "../debug/Comment"

class ItemLayout {
  @observable root = styled.div``
  @observable element = null
  @observable template = () =>
    <Comment>
      Hi!
    </Comment>
}

export default ItemLayout
