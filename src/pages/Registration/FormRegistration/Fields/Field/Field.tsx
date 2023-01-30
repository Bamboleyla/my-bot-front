import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../../../hooks/redux";
import InputLabel from "@mui/material/InputLabel";
import * as React from "react";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { IRegistrationState } from "../../../../../store/reducers/RegistrationFormSlice";

type props = {
  disabled?: boolean | undefined;
  label: string;
  valueKey: string;
  setValue: any; //TODO
};

export const Field = ({ disabled, label, valueKey, setValue }: props) => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );
  const fieldData: { value: string; error: boolean; errorText: string } =
    formValues.data[valueKey as keyof typeof formValues.data];

  const [showPassword, setShowPassword] = React.useState(false);

  return valueKey === "password" || valueKey === "repeatPassword" ? (
    <FormControl error={fieldData.error} variant="filled">
      <InputLabel htmlFor="filled-adornment-password">{label}</InputLabel>
      <FilledInput
        id={uuidv4()}
        type={showPassword ? "text" : "password"}
        onChange={(event) => setValue(event.target.value, fieldData.value)}
        value={fieldData.value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show) => !show)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id="component-error-text">
        {fieldData.errorText}
      </FormHelperText>
    </FormControl>
  ) : (
    <TextField
      error={fieldData.error}
      disabled={disabled}
      id={uuidv4()}
      label={label}
      variant="filled"
      onChange={(event) => setValue(event.target.value, fieldData.value)}
      value={fieldData.value}
      helperText={fieldData.errorText}
    />
  );
};
