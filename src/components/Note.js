const Note = (props) => {
  return (
    <div className="note">
      <label className="title">{props.title || "Placeholder"}</label>
    </div>
  );
};

export default Note;
