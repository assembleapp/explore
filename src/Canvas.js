import * as React from "react"
import { observer } from "mobx-react"

import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceMonitor,
  DropTarget,
} from "react-dnd"


// This function specifies the type of element being dragged.
//
// It is used to determine whether or not the dragged element
// can be dropped onto a specific target.
//
// It takes as an argument either the dragged element's or the target's props.
// It must return a string or array of strings, representing the element type.
const draggedItemType = (props) => "element"

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

/* Style declarations */
const cardStyle = {
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
}

/* Drag-and-drop source declaration */
const cardSource = {
  /* The value returned from this function
   * becomes available through `monitor.getItem()`
   */
  beginDrag(props: CardProps) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    }
  },

  /* Move the element back to its original position
   * if it did not end up being accepted by a target.
   */
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
  // Indicates that a card cannot receive another card.
  canDrop() {
    return false
  },

  /* However,
   * a card does need to know when another card is being held on top of it.
   * This is used to update the interface
   * with a preview of where the card will end up.
   *
   * This is an interesting aspect of the drag and drop library.
   * The order of the list is changed multiple times for each drag and drop.
   *
   * We'll likely want to use a view model
   * to represent the order of the list during the drag operation,
   * and then call `submit()` to save the change.
   */
  hover(props: CardProps, monitor: DropTargetMonitor) {
    const { id: draggedId } = monitor.getItem()
    // Since this function is in the context of a drop target,
    // the first argument represents the props of the target element
    // (i.e., the card *not* being dragged.)
    const { id: overId } = props

    if (draggedId !== overId) {
      // The `findCard` and `moveCard` functions
      // are defined in the container component,
      // which stores the list of cards.
      const { index: overIndex } = props.findCard(overId)
      props.moveCard(draggedId, overIndex)
    }
  },
}

const cardTargetforContainer = {
  /* The drag-and-drop operation has completed.
   * Save the changes to the data store.
   */
  drop() {
    console.log("dropped")
  }
}

/* Dragged component */

@DropTarget(draggedItemType, cardTargetForCard, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(draggedItemType, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

/* The card component takes a number of props as arguments:
 * * `id`, `text`: These represent the card element being displayed.
 *                 We should probably represent the card as a data model
 *                 instead of loose values.
 * * `connectDragSource`: A function provided by the `@DragSource` decorator
 *                        to help specify which DOM elements can be dragged.
 * * `connectDropTarget`: A function provided by the `@DropTarget` decorator
 *                        to help specify which DOM elements
 *                        can receive a dragged element.
 * * `isDragging`: Provided by the `@DragSource` decorator.
 *                 `true` when the item is being dragged.
 *                 We use this to make the original page element invisible
 *                 when it is being dragged to a new location.
 */
@observer
class Card extends React.Component<CardProps> {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const border = isDragging ? "2px dashed blue" : "1px dashed gray"

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(<div style={{ ...cardStyle, border }}>{text}</div>),
      )
    )
  }
}

/* Receiving component */

@DropTarget(draggedItemType, cardTargetforContainer, connect => ({
  connectDropTarget: connect.dropTarget(),
}))

/* The container component.
 * Knows when the drag-and-drop operation ends.
 *
 * Stores the logic for rearranging the elements that it displays,
 * though in this context it does not call those functions directly.
 */
@observer
class Container extends React.Component<ContainerProps> {
  render() {
    const { connectDropTarget } = this.props

    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          {this.props.store.cards.map(card => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              moveCard={this.props.store.moveCard}
              findCard={this.props.store.findCard}
            />
          ))}
        </div>,
      )
    )
  }
}

export default Container
