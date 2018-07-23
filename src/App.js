import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import Comment from "./debug/Comment"

import ItemLayout from "./layout/Item"
import ListLayout from "./layout/List"
import PageLayout from "./layout/Page"

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

@observer
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLayout: null,
    }
  }

  render() {
    return (
      <AppContainer>
        <AppBoundary>
          {this.renderElement(this.props.layout)}
        </AppBoundary>

        <CustomizationBoundary>
          { this.state.selectedLayout
            && <LiveProvider code={this.state.selectedLayout.template} >
                 <LiveEditor onChange={(newCode) => this.state.selectedLayout.template = newCode} />
                 <LiveError />
               </LiveProvider>
          }
        </CustomizationBoundary>
      </AppContainer>
    )
  }

  renderElement(element) {
    if(element instanceof PageLayout)
      return (
        React.createElement(
          element.root,
          {},
          element.layouts.map(layout => this.renderElement(layout))
        )
      );
    else if(element instanceof ListLayout)
      return (
        React.createElement(
          element.root,
          { onClick: (e => { this.setState({ selectedLayout: element }) }) },
          element.items.map(item =>
            <LiveProvider code={element.template} scope={{ item, repeat, actions: this.props.actions, Comment }} >
              <LivePreview />
            </LiveProvider>
          )
        )
      )
    else if(element instanceof ItemLayout) {
      return (
        element.element
        ? React.createElement(
            element.root,
            {},
            this.renderElement(element.template(element.element))
          )
        : null
      )
    }
    else if(element instanceof React.Component)
      return React.createElement(element)
    else
      return element
  }
}

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto 40rem;
`

const AppBoundary = styled.div``
const CustomizationBoundary = styled.div``

// Utility function.
// We need to find a better way to handle this.
const repeat = (number, collect) =>
  Array
    .apply(null, Array(number))
    .map((_, i) => collect(i + 1))

export default App;
