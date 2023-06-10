import { bindActionCreators } from "redux";

import { setAddress, setName, addGroup } from "app/common/cards/actions"

export default (dispatch, ownProps) => ({
  setAddress: (name, address) => dispatch(setAddress(name, address)),
  setName: (name, nextName) => dispatch(setName(name, nextName)),
  addGroup: (name, groupName) => dispatch(addGroup(name, groupName)),
  setStatus: (name, nextStatus) => dispatch(setStatus(name, nextStatus)),
})
