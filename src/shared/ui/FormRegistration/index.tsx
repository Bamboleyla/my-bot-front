import { Box } from "@mui/system";
import { Fields } from "./components/Fields";
import { Buttons } from "./components/Buttons";
import { memo } from "react";
import { IFildsList } from "./components/Fields/models";

export const FormRegistration = memo(({ formValues, config }: IFildsList) => {
  return (
    <Box sx={{ width: "40ch" }}>
      <Fields config={config} formValues={formValues} />
      <Buttons />
    </Box>
  );
});
