import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../../app/redux";
import { IRegistrationState } from "../../../../entities/registration/models";
import { PasswordField } from "../../../../shared/ui/PasswordField";

interface Props {
  disabled?: boolean | undefined;
  label: string;
  valueKey: string;
  setValue: Function;
}

export const Field = ({ disabled, label, valueKey, setValue }: Props) => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );
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