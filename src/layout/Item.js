import React from "react"
import styled from "styled-components"
import { observable } from "mobx"
import Comment from "../debug/Comment"

class ItemLayout {
  @observable root = styled.div``
  @observable element = null
  @observable template = `
    <Comment>
      Hi!
    </Comment>
  `
}

export default ItemLayout
