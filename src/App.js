import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import styled from "styled-components"
import Comment from "./debug/Comment"

import ItemLayout from "./layout/Item"
import ListLayout from "./layout/List"
import PageLayout from "./layout/Page"

import StyleForm from "./StyleForm"
import ReactTable from "react-table"
import "react-table/react-table.css";

import { Drag } from "mdi-material-ui"
import { DragDropContext, DragSource } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

const ListDragSource = {
  beginDrag(props) {
    console.log("dragging!")
    return props
  },
}

@DragDropContext(HTML5Backend)
@observer
class App extends React.Component {
  @observable selectedLayout = null

  render() {
    let selectedLayout = this.selectedLayout
    let { store } = this.props

    return (
      <AppContainer>
        <DataBoundary>
          <h2>Data</h2>

          {Object.keys(store).map(key =>
            store[key].length > 0
            ? <Section>
                <h3>{key} <DragHandle list={store[key]} /></h3>

                <ReactTable
                  data={store[key]}
                  columns={store.tableFieldsFor(key)}
                  defaultPageSize={5}
                />
              </Section>
            : <Section>
                <h3>No {key}</h3>
              </Section>
          )}
        </DataBoundary>

        <AppBoundary>
          {this.renderElement(this.props.layout)}
        </AppBoundary>

        <StyleBoundary>
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
        </StyleBoundary>
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
          { onClick: () => this.selectedLayout = element },
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
            { onClick: () => this.selectedLayout = element },
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
  grid-template-columns: 25rem auto 25rem;
`

const AppBoundary = styled.div``
const DataBoundary = styled.div`
  font-size: 12px;
  border-right: 1rem solid grey;
  padding: 1rem;
  height: 100vh;
  overflow-y: scroll;
`
const StyleBoundary = styled.div`
  font-size: 12px;
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
    border: 2px dashed grey;
  }
`

const Section = styled.div`
  border-top: 4px solid grey;
  margin-bottom: 1rem;
  margin-top: 1rem;
`


@DragSource("list", ListDragSource, (connect) => ({ connect: connect.dragSource() }))
class DragHandle extends React.Component {
  render = () => (
    this.props.connect(<span><DragIcon /></span>)
  )
}

const DragIcon = styled(Drag)`
  float: right;
`

export default App;
