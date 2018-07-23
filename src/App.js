import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import Comment from "./debug/Comment"

import ItemLayout from "./layout/Item"
import ListLayout from "./layout/List"
import PageLayout from "./layout/Page"
import StyleForm from "./StyleForm"

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
    let { selectedLayout } = this.state

    return (
      <AppContainer>
        <AppBoundary>
          {this.renderElement(this.props.layout)}
        </AppBoundary>

        <CustomizationBoundary>
          { selectedLayout
            ? <LiveProvider
                code={selectedLayout.template}
                scope={this.codeContext({ item: selectedLayout.element || selectedLayout.items[0] }) }
              >
                <h2>Style the component</h2>
                <StyleForm
                  styles={selectedLayout.styles}
                  onChange={styles => selectedLayout.styles = { ...selectedLayout.styles, ...styles }}
                />

                <h2>Edit the UI element</h2>

                <Section>
                  <h3>Available variables</h3>

                  Item:
                  <pre>
                    {JSON.stringify(selectedLayout.element || selectedLayout.items[0], null, 2)}
                  </pre>
                </Section>

                <Section>
                  <h3>Markup (in React)</h3>
                  <LiveEditor onChange={(newCode) => selectedLayout.template = newCode} />
                  <LiveError />
                </Section>
              </LiveProvider>
            : <div>
                Select an element to get started!
              </div>
          }

          <Section>
            <h3>Data</h3>
            {Object.keys(this.props.store).map(key =>
              <div>
                {key}:
                <pre>
                  {JSON.stringify(this.props.store[key], null, 2)}
                </pre>
              </div>
            )}
          </Section>
        </CustomizationBoundary>
      </AppContainer>
    )
  }

  codeContext(overrides) {
    return {
      item: {},
      repeat,
      actions: this.props.actions,
      Comment,
      ...overrides
    }
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
            <Selectable>
              <LiveProvider code={element.template} scope={this.codeContext({item})} >
                <LivePreview />
              </LiveProvider>
            </Selectable>
          )
        )
      )
    else if(element instanceof ItemLayout) {
      return (
        element.element
        ? React.createElement(
            element.root,
            { onClick: (e => { this.setState({ selectedLayout: element }) }) },
            <Selectable>
              <LiveProvider code={element.template} scope={ this.codeContext({ item: element.element }) } >
                <LivePreview />
              </LiveProvider>
            </Selectable>
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
  grid-template-columns: auto 35rem;
`

const AppBoundary = styled.div``
const CustomizationBoundary = styled.div`
  border-left: 1rem solid grey;
  padding: 1rem;
  height: 100vh;
  overflow-y: scroll;
`

// Utility function.
// We need to find a better way to handle this.
const repeat = (number, collect) =>
  Array
    .apply(null, Array(number))
    .map((_, i) => collect(i + 1))

const Selectable = styled.div`
  &:hover {
    border: 1px solid blue;
  }
`

const Section = styled.div`
  margin-top: 1rem;
`

export default App;
