import { FilledInput, FormControl, InputLabel } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import { State } from "./Authorization";
import { ErrorAuth } from "./ErrorAuth";

type Props = {
  values: State;
  setValues: Dispatch<SetStateAction<State>>;
};

export const LoginField = ({ values, setValues }: Props) => {
  const { handleChange } = useAuthorization({ values, setValues });

  const error = values.errorsValidation.login.length > 0;

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="filled-login">Login</InputLabel>
      <FilledInput
        error={error}
        id="filled-login"
        type={"text"}
        size="small"
        onChange={handleChange("login")}
        value={values.login}
      />
      <ErrorAuth text={values.errorsValidation.login} visible={error} />
    </FormControl>
  );
};
