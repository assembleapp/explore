import { observable } from "mobx"
import styled from "styled-components"

class ListLayout {
  @observable root = styled.div``
  @observable items = []
  @observable template = `
    <Comment>
      {JSON.stringify(item)}
    </Comment>
    `
}

export default ListLayout
