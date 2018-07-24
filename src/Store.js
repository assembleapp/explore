import { observable } from "mobx"

import Service from "./data/Service"

class Store {
  @observable services = []
  @observable bookings = []
  @observable products = []

  constructor(data) {
    this.services = data.services.map(service => new Service(service))
  }

  tableFieldsFor(dataType) {
    return {
      services: [
        { Header: "Emoji", accessor: "emoji" },
        { Header: "Name", accessor: "name" },
        { Header: "Hourly Rate", accessor: "hourly_rate" },
        { Header: "Table count", accessor: "table_count" },
      ],
      bookings: [
        { Header: "Service", accessor: "service.name" },
        { Header: "Table", accessor: "table_number" },
        { Header: "Start Time", accessor: "formatted_start_time" },
        { Header: "End Time", accessor: "formatted_end_time" },
      ],
      products: [
      ],
    }[dataType]
  }
}

export default Store
