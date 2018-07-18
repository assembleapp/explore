import { observable, action } from "mobx"
import { observer } from "mobx-react"
import styled from "styled-components"

/* Displays multiple layouts on the page.
 * Apply styles to the `root` property, using a `styled.div`.
 */
class PageLayout {
  @observable root = styled.div``
  @observable layouts = []

  @action
  display = (layout) => {
    this.layouts.push(layout)
  }
}

export default PageLayout
