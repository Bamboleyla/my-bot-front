import InputLabel from "@mui/material/InputLabel";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";

interface Props {
  fieldData: { value: string; error: boolean; errorText: string };
  label: string;
  setValue: any;
}

export const PasswordField = ({ config }: { config: Props }) => {
  const { fieldData, label, setValue } = config;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl
      error={fieldData.error}
      variant="filled"
      data-testid={"PasswordField"}
    >
      <InputLabel htmlFor="filled-adornment-password">{label}</InputLabel>
      <FilledInput
        id={"PasswordField"}
        type={showPassword ? "text" : "password"}
        onChange={(event) => setValue(event.target.value, fieldData.value)}
        value={fieldData.value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show: boolean) => !show)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        inputProps={{ "data-testid": "content-input" }}
      />
      <FormHelperText id={"PasswordFormHelperText"}>
        {fieldData.errorText}
      </FormHelperText>
    </FormControl>
  );
};
