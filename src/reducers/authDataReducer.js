function authDataReducer(state, action) {
  switch (action.type) {
    case "SET_AUTH_DATA":
      const { userMail, userId, authToken, expiresAt } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        userMail,
        userId,
        authToken,
        expiresAt,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userMail: null,
        userId: null,
        authToken: null,
        expiresAt: null,
      };
    default:
      throw new Error(`${action} n'existe pas`);
  }
}

export default authDataReducer;
