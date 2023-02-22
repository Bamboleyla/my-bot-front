import { Stack } from "@mui/system";
import { useMemo } from "react";
import { useAppSelector } from "../../../../app/redux";
import { Field } from "../Field";
import { Skeleton } from "../Skeleton";
import { useFields } from "./data";

export const Fields = () => {
  const { activeStep, isLoading } = useAppSelector(
    (state) => state.registrationForm
  );

  const getFields = useFields();

  const config = {
    width: 356,
    height: 56,
    repeat: 3,
  };

  const fields = useMemo(
    () =>
      getFields()[activeStep].map((field, index) => (
        <Field {...field} key={index} />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep]
  );

  return (
    <Stack spacing={2}>
      {isLoading.length === 0 ? fields : <Skeleton config={config} />}
    </Stack>
  );
};
