import { Box } from "@mui/system";
import { Fields } from "./components/Fields";
import { Buttons } from "./components/Buttons";
import { memo } from "react";
import { IFormRegistration } from "./models";

export const FormRegistration = memo(
  ({ formValues, config, display }: IFormRegistration) => {
    return (
      <Box sx={{ width: "40ch" }}>
        <Fields config={config} formValues={formValues} />
        <Buttons {...display} />
      </Box>
    );
  }
);
