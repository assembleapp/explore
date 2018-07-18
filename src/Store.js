import { observable } from "mobx"

import Service from "./data/Service"

class Store {
  @observable services = []
  @observable bookings = []
  @observable products = []

  constructor(data) {
    this.services = data.services.map(service => new Service(service))
  }
}

export default Store
