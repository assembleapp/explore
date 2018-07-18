import React from 'react';
import ReactDOM from 'react-dom';
import { action } from "mobx"
import styled from "styled-components"
import moment from "moment"

import './index.css';
import App from './App';

import ItemLayout from "./layout/Item"
import ListLayout from "./layout/List"
import PageLayout from "./layout/Page"

import Booking from "./data/Booking"
import LineItem from "./data/LineItem"
import Product from "./data/Product"
import Service from "./data/Service"

import Store from "./Store"

let layout = new PageLayout()
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

let lobby = new PageLayout()
layout.display(lobby)

lobby.root = styled.div`
  height: 100%;
`

let services = new ListLayout()
services.items = store.services
lobby.display(services)

services.root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const repeat = (number, collect) =>
  Array
    .apply(null, Array(number))
    .map((_, i) => collect(i + 1))

services.template = (service) =>
  <Center>
    <div>{service.emoji}</div>

    {repeat(service.table_count, table_number =>
      <div role="button" onClick={() => showTable(service, table_number)} >
        {table_number}
      </div>
    )}
  </Center>

const showTable = action((service, table_number) => {
  let booking = store.bookings.filter(booking =>
    booking.service === service &&
    booking.table_number === table_number
  )[0]

  if(!booking) {
    booking = new Booking({
      service,
      table_number,
      start_time: moment(),
    })

    store.bookings.push(booking)
  }

  detail.element = booking
  return booking
})

window.showTable = showTable

const Center = styled.div`
  text-align: center;
`

let detail = new ItemLayout()
detail.root = styled.div`
  background-color: navy;
  color: white;
  height: 100%;
`
detail.template = (booking) => {
  return <h1>
    {booking.service.emoji} {booking.service.name} #{booking.table_number}
  </h1>
}

layout.display(detail)

window.store = store
// window.debug = true

ReactDOM.render(<App layout={layout} />, document.getElementById('root'));
