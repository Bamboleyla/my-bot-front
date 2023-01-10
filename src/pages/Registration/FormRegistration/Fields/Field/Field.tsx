import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../../../../hooks/redux";

type props = {
  disabled?: boolean | undefined;
  label: string;
  valueKey: string;
  setValue: any; //TODO
};

export const Field = ({ disabled, label, valueKey, setValue }: props) => {
  const formValues = useAppSelector((state) => state.registrationForm);
  const fieldData = formValues[valueKey as keyof typeof formValues];

  return (
    <TextField
      error={fieldData.error}
      disabled={disabled}
      id="filled-basic"
      label={label}
      variant="filled"
      onChange={(event) => setValue(event.target.value, fieldData.value)}
      value={fieldData.value}
      helperText={fieldData.errorText}
    />
  );
};
