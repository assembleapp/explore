import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components"
import './index.css';
import App from './App';
import Layout from "./Layout"

import Booking from "./data/Booking"
import LineItem from "./data/LineItem"
import Product from "./data/Product"
import Service from "./data/Service"

import Store from "./Store"

let layout = new Layout()
let store = new Store({
  services: [
    { emoji: "🀄", name: "mahjong", unit_price: 20, table_count: 8 },
    { emoji: "🎱", name: "pool", unit_price: 20, table_count: 4 },
    { emoji: "🎤", name: "karaoke", unit_price: 20, table_count: 4 },
  ]
})

layout.root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`

let lobby = new Layout()
layout.addChild(lobby)

lobby.root = styled.div`
  height: 100%;
`

let services = lobby.representList(
  store.services,
  ({item}) => <div>
    <Center>{item.emoji}</Center>

    {Array.apply(null, Array(item.table_count)).map((_, i) =>
      <div>{i}</div>
    )}
  </div>
)

services.root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const Center = styled.div`
  text-align: center;
`

layout.addChild(styled.div`
  background-color: navy;
  color: white;
  height: 100%;
`)

window.store = store
// window.debug = true

ReactDOM.render(<App layout={layout} />, document.getElementById('root'));
