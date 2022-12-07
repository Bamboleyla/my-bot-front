import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box, Stack } from "@mui/system";
import { v4 as uuidv4 } from "uuid";

export const FormRegistration = ({ activeStep }: { activeStep: number }) => {
  const textFieldList = [
    [{ label: "Фамилия" }, { label: "Имя" }, { label: "Отчество" }],
    [
      {
        inputProps: {
          startAdornment: <InputAdornment position="start">+7</InputAdornment>,
        },
        label: "Телефон",
      },
      { label: "Email" },
      { disabled: true, label: "Страна", defaultValue: "Россия" },
      { label: "Город" },
    ],
    [{ label: "Номер Договора" }, { label: "Логин" }, { label: "Пароль" }],
    [],
  ];
  return (
    <Box sx={{ width: "40ch" }}>
      <Stack spacing={2}>
        {textFieldList[activeStep].map((field) => (
          <TextField
            disabled={field.disabled}
            id="filled-basic"
            label={field.label}
            defaultValue={field.defaultValue}
            variant="filled"
            InputProps={field.inputProps}
            key={uuidv4()}
          />
        ))}
      </Stack>
    </Box>
  );
};
