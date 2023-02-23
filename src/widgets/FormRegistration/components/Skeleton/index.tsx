import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const FieldsSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rounded" width={356} height={56} />
      <Skeleton variant="rounded" width={356} height={56} />
      <Skeleton variant="rounded" width={356} height={56} />
    </Stack>
  );
};
