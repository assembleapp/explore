import React from "react"
import { observer } from "mobx-react"
import ColorPicker from "./ColorPicker"

// Icons
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,

  FormatColorFill,
  FormatColorText,
} from "mdi-material-ui"

@observer
class StyleForm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3>Text alignment</h3>

          <button onClick={() => this.props.onChange({ textAlign: "left" })}>
            <FormatAlignLeft/>
          </button>

          <button onClick={() => this.props.onChange({ textAlign: "center" })}>
            <FormatAlignCenter/>
          </button>

          <button onClick={() => this.props.onChange({ textAlign: "right" })}>
            <FormatAlignRight/>
          </button>

          <button onClick={() => this.props.onChange({ textAlign: "justify" })}>
            <FormatAlignJustify/>
          </button>
        </div>

        <div>
          <h3>Colors</h3>

          <ColorPicker
            icon={FormatColorFill}
            color={this.props.styles.backgroundColor}
            onChange={color => this.props.onChange({ backgroundColor: color.hex })}
          />

          <ColorPicker
            icon={FormatColorText}
            color={this.props.styles.color}
            onChange={color => this.props.onChange({ color: color.hex })}
          />
        </div>
      </div>
    )
  }
}

export default StyleForm
