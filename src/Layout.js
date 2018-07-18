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
  representList = (list, component) => {
    let listElement = new Layout()

    listElement.children = list.map(item => () =>
      <DataContext item={item}>
        {React.createElement(component, { item: item })}
      </DataContext>
    )

    this.addChild(listElement)
    return listElement
  }
}

const DataContext = (props) =>
  <div>
    {window.debug &&
      <span style={{ color: "grey"}}>
        {JSON.stringify(props.item)}
      </span>
    }

    {props.children}
  </div>

export default Layout
