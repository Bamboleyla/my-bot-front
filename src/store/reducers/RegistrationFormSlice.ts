import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  firstName: { value: string; error: boolean; errorText: string };
  lastName: { value: string; error: boolean; errorText: string };
  middleName: { value: string; error: boolean; errorText: string };
  phoneNumber: { value: string; error: boolean; errorText: string };
  email: { value: string; error: boolean; errorText: string };
  country: { value: string; error: boolean; errorText: string };
  city: { value: string; error: boolean; errorText: string };
  tgToken: { value: string; error: boolean; errorText: string };
  password: { value: string; error: boolean; errorText: string };
  repeatPassword: { value: string; error: boolean; errorText: string };
}

const initialState: RegistrationState = {
  firstName: { value: "", error: false, errorText: "" },
  lastName: { value: "", error: false, errorText: "" },
  middleName: { value: "", error: false, errorText: "" },
  phoneNumber: { value: "+7", error: false, errorText: "" },
  email: { value: "", error: false, errorText: "" },
  country: { value: "Россия", error: false, errorText: "" },
  city: { value: "", error: false, errorText: "" },
  tgToken: { value: "", error: false, errorText: "" },
  password: { value: "", error: false, errorText: "" },
  repeatPassword: { value: "", error: false, errorText: "" },
};

export const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    setFirstName(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.firstName.value = action.payload.value;
      state.firstName.error = action.payload.error;
      state.firstName.errorText = action.payload.text;
    },
    setLastName(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.lastName.value = action.payload.value;
      state.lastName.error = action.payload.error;
      state.lastName.errorText = action.payload.text;
    },
    setMiddleName(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.middleName.value = action.payload.value;
      state.middleName.error = action.payload.error;
      state.middleName.errorText = action.payload.text;
    },
    setPhoneNumber(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.phoneNumber.value = action.payload.value;
      state.phoneNumber.error = action.payload.error;
      state.phoneNumber.errorText = action.payload.text;
    },
    setEmail(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.email.value = action.payload.value;
      state.email.error = action.payload.error;
      state.email.errorText = action.payload.text;
    },
    setCountry(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.country.value = action.payload.value;
      state.country.error = action.payload.error;
      state.country.errorText = action.payload.text;
    },
    setCity(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.city.value = action.payload.value;
      state.city.error = action.payload.error;
      state.city.errorText = action.payload.text;
    },
    setTgToken(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.tgToken.value = action.payload.value;
      state.tgToken.error = action.payload.error;
      state.tgToken.errorText = action.payload.text;
    },
    setPassword(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.password.value = action.payload.value;
      state.password.error = action.payload.error;
      state.password.errorText = action.payload.text;
    },
    setRepeatPassword(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.repeatPassword.value = action.payload.value;
      state.repeatPassword.error = action.payload.error;
      state.repeatPassword.errorText = action.payload.text;
    },
  },
});
