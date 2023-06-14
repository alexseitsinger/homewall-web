import { bindActionCreators } from "redux";

import { setAuthenticated } from "src/app/common/authentication/actions"

export default (dispatch, ownProps) => ({
  setAnonymous: (bool) => dispatch(setAuthenticated(false)),
})


