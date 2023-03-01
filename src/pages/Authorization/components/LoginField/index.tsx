import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { IAuth } from "../../models";
import { v4 as uuidv4 } from "uuid";

interface Props {
  values: IAuth;
  setValues: Dispatch<SetStateAction<IAuth>>;
}

export const LoginField = ({ values, setValues }: Props) => {
  return (
    <TextField
      error={values.login.error}
      id={uuidv4()}
      label="email"
      variant="filled"
      onChange={(event) =>
        setValues({
          ...values,
          login: { ...values.login, value: event.target.value },
        })
      }
      value={values.login.value}
      helperText={values.login.errorText}
    />
  );
};
