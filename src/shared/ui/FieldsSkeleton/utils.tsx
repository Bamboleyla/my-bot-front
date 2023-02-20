import Skeleton from "@mui/material/Skeleton";
import { Iconfig } from "./model";

export const sceleton = ({ config }: { config: Iconfig }) => {
  const { width, height, repeat } = config;
  const result = [<Skeleton variant="rounded" width={width} height={height} />];
  let i = 1;
  while (i < repeat) {
    result.push(<Skeleton variant="rounded" width={width} height={height} />);
    i++;
  }
  return result;
};
