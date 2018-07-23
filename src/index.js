import React from 'react';
import ReactDOM from 'react-dom';
import { action } from "mobx"
import moment from "moment"

import './index.css';
import App from './App';

import ItemLayout from "./layout/Item"
import ListLayout from "./layout/List"
import PageLayout from "./layout/Page"

import Store from "./Store"
import Booking from "./data/Booking"
import data from "./data.json"

let layout = new PageLayout()
let store = new Store(data)

layout.styles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  height: "100vh",
}

let lobby = new PageLayout()
layout.display(lobby)

lobby.styles = {
  height: "100%",
}

let services = new ListLayout()
services.items = store.services
lobby.display(services)

services.styles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  textAlign: "center",
}

services.template = `
  <div>
    <div>{item.emoji}</div>

    {repeat(item.table_count, table_number =>
      <div
        role="button"
        onClick={() => actions.showTable(item, table_number)}
        >
        {table_number}
      </div>
    )}
  </div>
`

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

let detail = new ItemLayout()
detail.styles = {
  backgroundColor: "navy",
  color: "white",
  height: "100%",
}

detail.template = `
  <h1>
    {item.service.emoji} {item.service.name} #{item.table_number}
  </h1>
`

layout.display(detail)

ReactDOM.render(
  <App layout={layout} actions={{ showTable }} store={store} />,
  document.getElementById('root'),
);
