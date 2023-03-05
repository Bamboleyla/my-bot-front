import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { PasswordField } from "../../../PasswordField";
import { IField } from "./models";

export const Field = ({
  formValues,
  disabled,
  label,
  valueKey,
  setValue,
}: IField) => {
  const fieldData = formValues.data[valueKey as keyof typeof formValues.data];

  const config = {
    fieldData,
    label,
    setValue,
  };

  const { value, error, errorText } = fieldData;

  return valueKey === "password" || valueKey === "repeatPassword" ? (
    <PasswordField config={config} />
  ) : (
    <TextField
      error={error}
      disabled={disabled}
      id={uuidv4()}
      label={label}
      variant="filled"
      onChange={(event) => setValue(event.target.value, value)}
      value={value}
      helperText={errorText}
    />
  );
};
