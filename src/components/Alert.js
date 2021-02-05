import MuiAlert from "@material-ui/lab/Alert";

//TODO This is a experimental component from the material-ui library. Find an alternative
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
