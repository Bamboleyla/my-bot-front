import { State } from "../components/Forms/Authorization/Authorization";
import { Dispatch, SetStateAction } from "react";

type Props = {
  values: State;
  setValues: Dispatch<SetStateAction<State>>;
};

export const useAuthorization = ({ values, setValues }: Props) => {
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const isFieldEmpty = (text: string) => text === "";

  const validationFields = (field: "login" | "password"): string[] => {
    const validationResults = [];
    if (isFieldEmpty(values[field])) {
      validationResults.push("Поле не может быть пустым");
    }
    return validationResults;
  };

  return {
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    validationFields,
  };
};
