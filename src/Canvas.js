import * as React from "react"

import HTML5Backend from "react-dnd-html5-backend"

import {
  ConnectDragSource,
  ConnectDropTarget,
  DragDropContext,
  DragSource,
  DragSourceMonitor,
  DropTarget,
  DropTargetMonitor,
} from "react-dnd"

const ItemTypes = {
  CARD: "card",
}

/* Typescript interfaces.
 * We aren't running Typescript,
 * so these are largely nonfunctional.
 * They're useful documentation at the moment though.
 */
export interface CardProps {
  id: string,
  text: string,
  connectDragSource?: ConnectDragSource,
  connectDropTarget?: ConnectDropTarget,
  isDragging?: boolean,
  moveCard: (id: string, to: number) => void,
  findCard: (id: string) => { index: number },
}

export interface ContainerProps {
  connectDropTarget?: ConnectDropTarget
}

export interface ContainerState {
  cards: any[]
}

/* Style declarations.
 * We'll migrate these to `styled-components`.
 */
const cardStyle = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
}

const containerStyle = {
  width: 400,
}

/* Drag-and-drop source declaration */
const cardSource = {
  beginDrag(props: CardProps) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    }
  },

  endDrag(props: CardProps, monitor: DragSourceMonitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex)
    }
  },
}

/* Drag-and-drop target declaration */

const cardTargetForCard = {
  canDrop() {
    return false
  },

  hover(props: CardProps, monitor: DropTargetMonitor) {
    const { id: draggedId } = monitor.getItem()
    const { id: overId } = props

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId)
      props.moveCard(draggedId, overIndex)
    }
  },
}

const cardTargetforContainer = {
  drop() {
    //
  },
}

/* Dragged component */

@DropTarget(ItemTypes.CARD, cardTargetForCard, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

class Card extends React.Component<CardProps> {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(<div style={{ ...cardStyle, opacity }}>{text}</div>),
      )
    )
  }
}

/* Receiving component */

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTargetforContainer, connect => ({
  connectDropTarget: connect.dropTarget(),
}))

class Container extends React.Component<
  ContainerProps,
  ContainerState
> {
  constructor(props: ContainerProps) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.findCard = this.findCard.bind(this)
    this.state = {
      cards: [
        { id: 1, text: "1" },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
        { id: 4, text: "4" },
        { id: 5, text: "5" },
        { id: 6, text: "6" },
        { id: 7, text: "7" },
      ],
    }
  }

  render() {
    const { connectDropTarget } = this.props
    const { cards } = this.state

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={containerStyle}>
          {cards.map(card => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              moveCard={this.moveCard}
              findCard={this.findCard}
            />
          ))}
        </div>,
      )
    )
  }

  moveCard(id: string, atIndex: number) {
    const { card, index } = this.findCard(id)

    let list = this.state.cards
    list.splice(index, 1)
    list.splice(atIndex, 0, card)

    this.setState({ cards: list })
  }

  findCard(id: string) {
    const { cards } = this.state
    const card = cards.filter(c => c.id === id)[0]

    return {
      card,
      index: cards.indexOf(card),
    }
  }
}

export default Container
