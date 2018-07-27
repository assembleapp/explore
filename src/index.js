import React from 'react';
import ReactDOM from 'react-dom';
import { action } from "mobx"
import moment from "moment"

import './index.css';
import App from './App';

import ItemLayout from "./layout/Item"
import PageLayout from "./layout/Page"

import Store from "./Store"
import Booking from "./data/Booking"
import data from "./data.json"

let store = new Store(data)

// Actions
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

// Layout elements
let layout = new PageLayout()
layout.styles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  height: "100vh",
}

let lobby = new PageLayout()
layout.display(lobby)

let detail = new ItemLayout()
layout.display(detail)

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

ReactDOM.render(
  <App layout={layout} actions={{ showTable }} store={store} />,
  document.getElementById('root'),
);
