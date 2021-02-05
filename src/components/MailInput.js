const MailInput = (props) => {
  return (
    <input onChange={props.onChange} type="email" placeholder="Email"></input>
  );
};

export default MailInput;
