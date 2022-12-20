import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { Fields } from "./Fields/Fields";
import { Buttons } from "./Buttons/Buttons";

export type FormRegistrationType = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  steps: string[];
};

export const FormRegistration = (props: FormRegistrationType) => {
  return (
    <Box sx={{ width: "40ch" }}>
      <Fields activeStep={props.activeStep} />
      <Buttons {...props} />
    </Box>
  );
};
