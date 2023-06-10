import { bindActionCreators } from "redux";

import { setOriginalCardName } from "app/common/cards/actions"

export default (dispatch, ownProps) => ({
  setOriginalCardName: (name, originalName) => {
    dispatch(setOriginalCardName(name, originalName))
  },
})
