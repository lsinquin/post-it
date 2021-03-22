function backgroundRequestDataReducer(state, action) {
  switch (action.type) {
    case "REQUEST_START":
      return {
        ...state,
        requestCounter: state.requestCounter + 1,
      };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        requestCounter: state.requestCounter - 1,
      };
    case "REQUEST_CRITICAL_FAILURE":
      return {
        ...state,
        isConsistent: false,
      };
    default:
      throw new Error(`${action} n'existe pas`);
  }
}

export default backgroundRequestDataReducer;
