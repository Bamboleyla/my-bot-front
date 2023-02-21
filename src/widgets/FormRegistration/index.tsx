import { Box } from "@mui/system";
import { Fields } from "./components/fields";
import { Buttons } from "../../features/RegistrationFormButtoms";
import { memo } from "react";

export default memo(() => (
  <Box sx={{ width: "40ch" }}>
    <Fields />
    <Buttons />
  </Box>
));
