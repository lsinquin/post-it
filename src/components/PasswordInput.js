const PasswordInput = (props) => {
  return (
    <input
      onChange={props.onChange}
      type="password"
      placeholder="Password"
    ></input>
  );
};

export default PasswordInput;
