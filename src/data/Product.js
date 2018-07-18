import { observable } from "mobx"

class Product {
  @observable name
  @observable unit_price
  @observable type
}

export default Product
