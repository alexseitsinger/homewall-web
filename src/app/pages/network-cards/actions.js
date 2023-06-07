export const setAddress = (name, address) => ({
  type: "network-cards/ADDRESS",
  name,
  address,
})

export const setName = (name, nextName) => ({
  type: "network-cards/NAME",
  name,
  nextName,
})

export const addGroup = (name, groupName) => ({
  type: "network-cards/ADD_GROUP",
  name,
  groupName,
})

export const setStatus = (name, nextStatus) => ({
  type: "network-cards/SET_STATUS",
  name,
  nextStatus,
})
