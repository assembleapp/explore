import React from "react"
import { observable } from "mobx"
import styled from "styled-components"
import Comment from "../debug/Comment"

class ListLayout {
  @observable root = styled.div``
  @observable items = []
  @observable template = (item) =>
    <Comment>
      {JSON.stringify(item)}
    </Comment>
}

export default ListLayout
