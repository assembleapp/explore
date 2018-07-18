import React from "react"
import { observable, action } from "mobx"
import styled from "styled-components"

class Layout {
  @observable root = styled.div``
  @observable children = []

  @action
  addChild = (child) => {
    this.children.push(child)
  }

  @action
  addList = (list, component) => {
    list.forEach(item => {
      this.addChild(() => React.createElement(component, { item: item }))
    })
  }
}

export default Layout
