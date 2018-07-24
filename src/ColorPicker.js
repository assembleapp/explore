import React from "react"
import { SketchPicker } from "react-color";
import { observable } from "mobx"
import { observer } from "mobx-react"

@observer
class ColorPicker extends React.Component {
  @observable displayColorPicker = false

  handleClick = () => {
    this.displayColorPicker = !this.displayColorPicker
  };

  handleClose = () => {
    this.displayColorPicker = false
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <span>
        <button onClick={ this.handleClick } >
          {React.createElement(this.props.icon)}
        </button>
        { this.displayColorPicker
          ? <div style={ popover }>
              <div style={ cover } onClick={ this.handleClose }/>

              <SketchPicker
                color={this.props.color}
                onChange={this.props.onChange}
              />
            </div>
          : null
        }
      </span>
    )
  }
}

export default ColorPicker
