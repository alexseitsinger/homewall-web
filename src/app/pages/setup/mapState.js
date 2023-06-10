export default (state, ownProps) => ({
  isAuthenticated: state.common.authentication.isAuthenticated,
  cards: state.common.cards,
});
