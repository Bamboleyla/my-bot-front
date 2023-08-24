import { Box } from "@mui/system";
import { memo } from "react";
import { Fields } from "./components/Fields";
import { Buttons } from "./components/Buttons";
import { IFormRegistration } from "./models";

export const FormRegistration = memo(
  ({ formValues, config, display }: IFormRegistration) => {
    return (
      <Box sx={{ width: "40ch" }} data-testid={"FormRegistration"}>
        <Fields config={config} formValues={formValues} />
        <Buttons {...display} />
      </Box>
    );
  }
);
