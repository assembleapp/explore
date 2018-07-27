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

/*
 * In addition to standard React style properties,
 * this form works with a few custom ones:
 *
 * gridRowCount (used to calculate `grid-template-rows`)
 * gridColumnCount (used to calculate `grid-template-columns`)
 */
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

        <div>
          <h3>Grid Settings</h3>

          <div>
            <label># Columns</label>
            <input
              type="number"
              value={this.props.gridColumnCount || 1}
              onChange={e => this.props.onChange({
                display: "grid",
                gridColumnCount: e.target.value,
                gridTemplateColumns: `repeat(${e.target.value}, 1fr)`,
              })}
            />
          </div>

          <div>
            <label># Rows</label>
            <input
              type="number"
              value={this.props.gridRowCount || 1}
              onChange={e => this.props.onChange({
                display: "grid",
                gridRowCount: e.target.value,
                gridTemplateRows: `repeat(${e.target.value}, 1fr)`,
              })}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default StyleForm
