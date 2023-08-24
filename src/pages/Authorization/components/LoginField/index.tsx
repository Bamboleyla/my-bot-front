import TextField from "@mui/material/TextField";

interface Props {
  values: { value: string; error: boolean; errorText: string };
  setValues: any;
}

export const LoginField = ({ values, setValues }: Props) => {
  const { value, error, errorText } = values;
  return (
    <TextField
      error={error}
      id={"LoginField"}
      label="email"
      variant="filled"
      onChange={(event) => setValues(event.target.value)}
      value={value}
      helperText={errorText}
      inputProps={{ "data-testid": "content-input" }}
    />
  );
};
