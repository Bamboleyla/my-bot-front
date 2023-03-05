import { Stack } from "@mui/system";
import { Field } from "../Field";
import { FieldsSkeleton } from "../Skeleton";
import { IFildsList } from "./models";

export const Fields = ({ config, formValues }: IFildsList) => {
  const list = () =>
    config[formValues.activeStep].map((field, index) => (
      <Field {...field} key={index} formValues={formValues} />
    ));

  return (
    <Stack spacing={2}>
      {formValues.isLoading.length === 0 ? list() : <FieldsSkeleton />}
    </Stack>
  );
};
