import { observable, computed } from "mobx"

class Booking {
  @observable service
  @observable table_number // (from 1 to service.table_count)
  @observable start_time
  @observable end_time
  @computed get duration() { return this.end_time - this.start_time }
  @observable hourly_rate // (auto-fill from service)
  @computed get total() { return this.hourly_rate * this.duration + this.line_items.map(item => item.price).sum() }
  @observable line_items: [LineItem]

// TODO: ensure no overlap for (service, table_number), start_time - end_time

  constructor(data) {
    this.service = data.service
    this.table_number = data.table_number
    this.start_time = data.start_time
    this.end_time = data.end_time
  }
}

export default Booking
