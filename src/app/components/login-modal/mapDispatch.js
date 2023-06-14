import { bindActionCreators } from "redux";

import { setAuthenticated } from "src/app/common/authentication/actions"

export default (dispatch, ownProps) => ({
  setAuthenticated: (bool) => dispatch(setAuthenticated(bool)),
})

