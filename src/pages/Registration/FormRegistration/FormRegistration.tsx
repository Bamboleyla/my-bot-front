import { Box } from "@mui/system";
import { Fields } from "./Fields/Fields";
import { Buttons } from "./Buttons/Buttons";
import React from "react";

export default React.memo(() => (
  <Box sx={{ width: "40ch" }}>
    <Fields />
    <Buttons />
  </Box>
));
