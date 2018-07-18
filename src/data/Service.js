import { observable } from "mobx"

class Service {
  @observable emoji
  @observable name
  @observable hourly_rate
  @observable table_count

  constructor(data) {
    this.emoji = data.emoji
    this.name = data.name
    this.hourly_rate = data.hourly_rate
    this.table_count = data.table_count
  }
}

export default Service
