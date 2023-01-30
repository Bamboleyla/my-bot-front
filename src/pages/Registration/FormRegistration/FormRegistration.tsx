import { Box } from "@mui/system";
import { Fields } from "./Fields/Fields";
import { Buttons } from "./Buttons/Buttons";
import { memo } from "react";

export default memo(() => (
  <Box sx={{ width: "40ch" }}>
    <Fields />
    <Buttons />
  </Box>
));
