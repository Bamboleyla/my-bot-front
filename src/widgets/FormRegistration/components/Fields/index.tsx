import { Stack } from "@mui/system";
import { Field } from "../Field";
import { FieldsSkeleton } from "../../../../shared/components/FieldsSkeleton";
import { IFields } from "./models";

export const Fields = ({ config, formValues }: IFields) => {
  const fields = () =>
    config[formValues.activeStep].map((field, index) => (
      <Field {...field} key={index} formValues={formValues} />
    ));

  return (
    <Stack spacing={2} data-testid={"Fields"}>
      {formValues.isLoading.length === 0 ? fields() : <FieldsSkeleton />}
    </Stack>
  );
};
