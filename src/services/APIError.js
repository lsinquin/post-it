class APIError extends Error {
  constructor(
    message = "Une erreur innatendu a eu lieu",
    errorId = "err_unknown"
  ) {
    super(message);
    this.errorId = errorId;
    this.name = "APIerror";
  }
}

export default APIError;
