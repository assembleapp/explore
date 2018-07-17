import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Store from "./Store"
import { autorun } from "mobx"

window.store = new Store()

window.store.cards = [
  { id: 1, text: "1" },
  { id: 2, text: "2" },
  { id: 3, text: "3" },
  { id: 4, text: "4" },
  { id: 5, text: "5" },
  { id: 6, text: "6" },
  { id: 7, text: "7" },
]

autorun(() =>
  console.log(window.store.cards.map((item) => item.text))
)

ReactDOM.render(<App store={window.store} />, document.getElementById('root'));
