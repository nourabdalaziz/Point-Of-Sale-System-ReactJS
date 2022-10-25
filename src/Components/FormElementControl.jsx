import Input from "./Input.jsx";
import Select from "./Select.jsx";

function FormElementControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    default:
      return null;
  }
}
export default FormElementControl;
