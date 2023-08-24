import { initialState } from "./initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegistrationState } from "./models";

export const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    setFirstName(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.firstName.value = action.payload.value;
      state.data.firstName.error = action.payload.error;
      state.data.firstName.errorText = action.payload.text;
    },
    setLastName(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.lastName.value = action.payload.value;
      state.data.lastName.error = action.payload.error;
      state.data.lastName.errorText = action.payload.text;
    },
    setMiddleName(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.middleName.value = action.payload.value;
      state.data.middleName.error = action.payload.error;
      state.data.middleName.errorText = action.payload.text;
    },
    setPhoneNumber(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.phoneNumber.value = action.payload.value;
      state.data.phoneNumber.error = action.payload.error;
      state.data.phoneNumber.errorText = action.payload.text;
    },
    setEmail(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.email.value = action.payload.value;
      state.data.email.error = action.payload.error;
      state.data.email.errorText = action.payload.text;
    },
    setCountry(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.country.value = action.payload.value;
      state.data.country.error = action.payload.error;
      state.data.country.errorText = action.payload.text;
    },
    setCity(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.city.value = action.payload.value;
      state.data.city.error = action.payload.error;
      state.data.city.errorText = action.payload.text;
    },
    setTgToken(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.tgToken.value = action.payload.value;
      state.data.tgToken.error = action.payload.error;
      state.data.tgToken.errorText = action.payload.text;
    },
    setPassword(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.password.value = action.payload.value;
      state.data.password.error = action.payload.error;
      state.data.password.errorText = action.payload.text;
    },
    setRepeatPassword(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.repeatPassword.value = action.payload.value;
      state.data.repeatPassword.error = action.payload.error;
      state.data.repeatPassword.errorText = action.payload.text;
    },
    addLoadingProcess(
      state: IRegistrationState,
      action: PayloadAction<{ value: string }>
    ) {
      state.isLoading = [...state.isLoading, action.payload.value];
    },
    deleteLoadingProcess(
      state: IRegistrationState,
      action: PayloadAction<{ value: string }>
    ) {
      state.isLoading = state.isLoading.filter(
        (process) => process !== action.payload.value
      );
    },
    setActiveStep(
      state: IRegistrationState,
      action: PayloadAction<{ value: number }>
    ) {
      state.activeStep = action.payload.value;
    },
    setEmailCode(
      state: IRegistrationState,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.emailCode.value = action.payload.value;
      state.data.emailCode.error = action.payload.error;
      state.data.emailCode.errorText = action.payload.text;
    },
  },
});
