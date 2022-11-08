import styles from "./authorization.module.scss";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export const Authorization = () => {
  return (
    <div className={styles.form}>
      <Stack spacing={2}>
        <TextField
          id="filled-basic"
          label="Login"
          variant="filled"
          size="small"
        />
        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          size="small"
        />
      </Stack>
    </div>
  );
};
