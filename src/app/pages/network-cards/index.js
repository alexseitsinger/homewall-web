import { connect } from "react-redux"

import mapDispatch from "./mapDispatch"
import mapState from "./mapState"
import Page from "./page"

export default connect(mapState, mapDispatch)(Page);
