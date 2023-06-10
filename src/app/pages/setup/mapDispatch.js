import { bindActionCreators } from "redux";

import * as cardActions from "app/common/cards/actions"

export default (dispatch, ownProps) => ({
  setOriginalCardName: (name, originalName) => {
    dispatch(cardActions.setOriginalCardName(name, originalName))
  },
})
