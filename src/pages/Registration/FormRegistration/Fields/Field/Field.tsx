import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../../../../hooks/redux";

type props = {
  disabled?: boolean | undefined;
  label: string;
  inputProps?: any; //TODO
  valueKey: string;
  setValue: any; //TODO
};

export const Field = ({
  disabled,
  label,
  inputProps,
  valueKey,
  setValue,
}: props) => {
  const formValues = useAppSelector((state) => state.registrationForm);

  return (
    <TextField
      disabled={disabled}
      id="filled-basic"
      label={label}
      variant="filled"
      InputProps={inputProps}
      onChange={(event) =>
        setValue(
          event.target.value,
          formValues[valueKey as keyof typeof formValues]
        )
      }
      value={formValues[valueKey as keyof typeof formValues]}
    />
  );
};
