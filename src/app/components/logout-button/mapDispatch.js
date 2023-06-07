import { bindActionCreators } from "redux";

import { setAuthenticated } from "src/app/authentication/actions"

export default (dispatch, ownProps) => ({
  setAnonymous: (bool) => dispatch(setAuthenticated(false)),
})


