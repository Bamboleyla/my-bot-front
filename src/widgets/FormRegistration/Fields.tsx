import { Stack } from "@mui/system";
import { useMemo } from "react";
import { useAppSelector } from "../../app/redux";
import { RegistrationFormField } from "../../shared/ui/RegistrationFormField";
import { FieldsSkeleton } from "../../shared/ui/FieldsSkeleton";
import { useFields } from "./hooks/useFields";

export const Fields = () => {
  const { activeStep, isLoading } = useAppSelector(
    (state) => state.registrationForm
  );

  const getTextField = useFields();

  const config = {
    width: 356,
    height: 56,
    repeat: 3,
  };

  const fields = useMemo(
    () =>
      getTextField()[activeStep].map((field, index) => (
        <RegistrationFormField {...field} key={index} />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep]
  );

  return (
    <Stack spacing={2}>
      {isLoading.length === 0 ? fields : <FieldsSkeleton config={config} />}
    </Stack>
  );
};
