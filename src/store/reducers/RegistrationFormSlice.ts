import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRegistrationState {
  data: {
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
  };
  isLoading: boolean;
}

const initialState: IRegistrationState = {
  data: {
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
  },
  isLoading: false,
};

export const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    setFirstName(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.firstName.value = action.payload.value;
      state.data.firstName.error = action.payload.error;
      state.data.firstName.errorText = action.payload.text;
    },
    setLastName(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.lastName.value = action.payload.value;
      state.data.lastName.error = action.payload.error;
      state.data.lastName.errorText = action.payload.text;
    },
    setMiddleName(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.middleName.value = action.payload.value;
      state.data.middleName.error = action.payload.error;
      state.data.middleName.errorText = action.payload.text;
    },
    setPhoneNumber(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.phoneNumber.value = action.payload.value;
      state.data.phoneNumber.error = action.payload.error;
      state.data.phoneNumber.errorText = action.payload.text;
    },
    setEmail(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.email.value = action.payload.value;
      state.data.email.error = action.payload.error;
      state.data.email.errorText = action.payload.text;
    },
    setCountry(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.country.value = action.payload.value;
      state.data.country.error = action.payload.error;
      state.data.country.errorText = action.payload.text;
    },
    setCity(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.city.value = action.payload.value;
      state.data.city.error = action.payload.error;
      state.data.city.errorText = action.payload.text;
    },
    setTgToken(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.tgToken.value = action.payload.value;
      state.data.tgToken.error = action.payload.error;
      state.data.tgToken.errorText = action.payload.text;
    },
    setPassword(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.password.value = action.payload.value;
      state.data.password.error = action.payload.error;
      state.data.password.errorText = action.payload.text;
    },
    setRepeatPassword(
      state,
      action: PayloadAction<{ value: string; error: boolean; text: string }>
    ) {
      state.data.repeatPassword.value = action.payload.value;
      state.data.repeatPassword.error = action.payload.error;
      state.data.repeatPassword.errorText = action.payload.text;
    },
    setLoading(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoading = action.payload.value;
    },
  },
});
