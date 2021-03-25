function notesReducer(state, action) {
  switch (action.type) {
    case "SET_NOTES":
      return action.payload;
    case "ADD_NOTE":
      return [...state, action.payload];
    case "REMOVE_NOTE":
      return state.filter((item, _) => item.id !== action.payload.id);
    case "MODIFY_NOTE":
      const { id, title, content } = action.payload;

      return state.map((item, _) => {
        if (item.id === id) {
          return { ...item, title, content };
        }
        return item;
      });
    default:
      throw new Error(`${action} n'existe pas`);
  }
}

export default notesReducer;
