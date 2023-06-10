import initialState from "./state.json";

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case "cards/ADDRESS": {
      const nextCards = []

      state.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            address: action.address,
          })
        } else {
          nextCards.push(c)
        }
      })

      return nextCards;
    }
    case "cards/NAME": {
      const nextCards = []

      state.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            name: action.nextName,
          })
        } else {
          nextCards.push(c)
        }
      })

      return nextCards;
    }
    case "cards/ADD_GROUP": {
      const nextCards = []

      state.forEach(c => {
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

      return nextCards;
    }
    case "cards/SET_STATUS": {
      const nextCards = []

      state.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            status: action.nextStatus,
          })
        } else {
          nextCards.push(c)
        }
      })

      return nextCards;
    }
    case "cards/SET-ORIGINAL-CARD-NAME": {
      const nextCards = [];

      state.forEach(c => {
        if (c.name === action.name) {
          nextCards.push({
            ...c,
            originalName: action.originalName,
          })
        } else {
          nextCards.push(c);
        }
      })

      return nextCards;
    }
  }
}
