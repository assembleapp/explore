import { observable, computed } from "mobx"

class LineItem {
  @observable product
  @observable count
  @observable unit_price // (auto-fill from Product)
  @computed get price() { return this.count * this.unit_price }
}

export default LineItem
