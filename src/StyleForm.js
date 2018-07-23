import React from "react"

class StyleForm extends React.Component {
  render() {
    return (
      <span onClick={() => this.props.onChange({ backgroundColor: "green" }) }>
        Change background to green
      </span>
    )
  }
}

export default StyleForm
