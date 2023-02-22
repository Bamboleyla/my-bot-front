import { FilledInput, FormControl, InputLabel } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { IAuth } from "../../models";

interface Props {
  values: IAuth;
  setValues: Dispatch<SetStateAction<IAuth>>;
}

export const LoginField = ({ values, setValues }: Props) => {
  const error = values.login.error;

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="filled-login">Login</InputLabel>
      <FilledInput
        error={error}
        id="filled-login"
        type={"text"}
        size="small"
        onChange={(event) =>
          setValues({
            ...values,
            login: { ...values.login, value: event.target.value },
          })
        }
        value={values.login.value}
      />
      <ErrorMessage text={values.login.errorText} visible={error} />
    </FormControl>
  );
};
