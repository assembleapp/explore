import Store from './Store';
import Service from "./data/Service"

it("starts with the provided data", () => {
  let serviceInfo = {
    emoji: "fakeEmoji",
    name: "mahjong",
    unit_price: 20,
    table_count: 8,
  }

  const store = new Store({ services: [ serviceInfo ] })

  expect(store.services).toEqual([ new Service(serviceInfo) ])
})
