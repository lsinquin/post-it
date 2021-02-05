const Header = (props) => {
  return (
    <div className="header">
      <div className="actionbar">
        <button onClick={props.handleAddNote} className="header-button">
          Add
        </button>
        <button onClick={props.handleDeleteAll} className="header-button">
          Delete All
        </button>
      </div>
      <div className="userinfo">
        <label>{props.pseudo || "lsinquin"}</label>
        <button onClick={props.handleLogOut} className="header-button">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
