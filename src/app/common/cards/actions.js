export const setAddress = (name, address) => ({
  type: "cards/ADDRESS",
  name,
  address,
})

export const setName = (name, nextName) => ({
  type: "cards/NAME",
  name,
  nextName,
})

export const setOriginalCardName = (name, originalName) => ({
  type: "cards/SET-ORIGINAL-CARD-NAME",
  name,
  originalName,
})

export const addGroup = (name, groupName) => ({
  type: "cards/ADD_GROUP",
  name,
  groupName,
})

export const setStatus = (name, nextStatus) => ({
  type: "cards/SET_STATUS",
  name,
  nextStatus,
})

const getCard = async (cardName) => {
  return (await axios.post('http://127.0.0.1/run', {
    headers: { 'Content-Type': 'application/json' },
    data: { 'command': `/sbin/ifconfig ${cardName}` },
  }))
}
