import { observable, action } from "mobx"

class Store {
  @observable cards = []

  @action
  moveCard = (id: string, atIndex: number) => {
    const { card, index } = this.findCard(id)

    this.cards.splice(index, 1)
    this.cards.splice(atIndex, 0, card)
  }

  findCard = (id: string) => {
    const card = this.cards.filter(c => c.id === id)[0]

    return {
      card,
      index: this.cards.indexOf(card),
    }
  }
}

export default Store
