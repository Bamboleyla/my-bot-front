import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { State } from "./Authorization";
import { Dispatch, SetStateAction } from "react";
import { ErrorAuth } from "./ErrorAuth";
import { useAuthorization } from "../../hooks/useAuthorization";

type Props = {
  values: State;
  setValues: Dispatch<SetStateAction<State>>;
};

export const PasswordField = ({ values, setValues }: Props) => {
  const { handleChange, handleClickShowPassword, handleMouseDownPassword } =
    useAuthorization({ values, setValues });

  const error = values.errorsValidation.password.length > 0;

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
      <FilledInput
        error={values.errorsValidation.password.length > 0}
        id="filled-adornment-password"
        type={values.showPassword ? "text" : "password"}
        size="small"
        value={values.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <ErrorAuth text={values.errorsValidation.password} visible={error} />
    </FormControl>
  );
};
