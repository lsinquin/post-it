function requestDataReducer(state, action) {
  switch (action.type) {
    case "REQUEST_START":
      return {
        ...state,
        isRequesting: true,
        errorId: null,
        errorMessage: "",
      };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        isRequesting: false,
      };
    case "REQUEST_FAILURE":
      const { errorId, message: errorMessage } = action.payload;
      return {
        ...state,
        isRequesting: false,
        errorId,
        errorMessage,
      };
    default:
      throw new Error(`${action} n'existe pas`);
  }
}

export default requestDataReducer;
