import initialState from "./state.json"

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
    case "network-cards/ADDRESS": {
      const nextCards = []

      state.cards.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            address: action.address,
          })
        } else {
          nextCards.push(c)
        }
      })

      return {
        ...state,
        cards: nextCards,
      }
    }
    case "network-cards/NAME": {
      const nextCards = []

      state.cards.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            name: action.nextName,
          })
        } else {
          nextCards.push(c)
        }
      })

      return {
        ...state,
        cards: nextCards,
      }
    }
    case "network-cards/ADD_GROUP": {
      const nextCards = []

      state.cards.forEach(c => {
        if (c.name === action.name) {
          const groups = [...c.groups];
          if (!(groups.includes(action.group))) {
            groups = [...groups, action.group]
          }

          nextCards.push({
            ...c,
            groups,
          })
        } else {
          nextCards.push(c)
        }
      })

      return {
        ...state,
        cards: nextCards,
      }
    }
    case "network-cards/SET_STATUS": {
      const nextCards = []

      state.cards.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            status: action.nextStatus,
          })
        } else {
          nextCards.push(c)
        }
      })

      return {
        ...state,
        cards: nextCards,
      }
    }
  }
}
