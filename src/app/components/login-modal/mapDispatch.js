import { bindActionCreators } from "redux";

import { setAuthenticated } from "src/app/authentication/actions"

export default (dispatch, ownProps) => ({
  setAuthenticated: (bool) => dispatch(setAuthenticated(bool)),
})

