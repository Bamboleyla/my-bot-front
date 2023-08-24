import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const FieldsSkeleton = () => {
  const config = [
    { width: 356, height: 56 },
    { width: 356, height: 56 },
    { width: 356, height: 56 },
  ];
  return (
    <Stack spacing={2}>
      {config.map((item, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={item.width}
          height={item.height}
          data-testid={"skeleton"}
        />
      ))}
    </Stack>
  );
};
