import { Box } from "@mui/system";
import { Fields } from "./components/Fields";
import { Buttons } from "./components/Buttons";
import { memo } from "react";

export default memo(() => (
  <Box sx={{ width: "40ch" }}>
    <Fields />
    <Buttons />
  </Box>
));
