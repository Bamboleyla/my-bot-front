import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Dispatch, SetStateAction } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { useState } from "react";
import { IAuth } from "../../models";

interface Props {
  values: IAuth;
  setValues: Dispatch<SetStateAction<IAuth>>;
}

export const PasswordField = ({ values, setValues }: Props) => {
  const [visibleText, setVisibleText] = useState(false);

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
      <FilledInput
        error={values.password.error}
        id="filled-adornment-password"
        type={visibleText ? "text" : "password"}
        size="small"
        value={values.password.value}
        onChange={(event) =>
          setValues({
            ...values,
            password: { ...values.password, value: event.target.value },
          })
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisibleText(!visibleText)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {visibleText ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <ErrorMessage
        text={values.password.errorText}
        visible={values.password.error}
      />
    </FormControl>
  );
};
