import Stack from "@mui/material/Stack";
import { Iconfig } from "./model";
import { sceleton } from "./utils";

export const Skeleton = ({ config }: { config: Iconfig }) => (
  <Stack spacing={2}>{sceleton({ config })}</Stack>
);
