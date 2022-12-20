import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  contractNumber: string;
  tgToken: string;
  login: string;
  password: string;
  repeatPassword: string;
}

const initialState: RegistrationState = {
  firstName: "",
  lastName: "",
  middleName: "",
  phoneNumber: "",
  email: "",
  country: "Россия",
  city: "",
  contractNumber: "",
  tgToken: "",
  login: "",
  password: "",
  repeatPassword: "",
};

export const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<{ value: string }>) {
      state.firstName = action.payload.value;
    },
    setLastName(state, action: PayloadAction<{ value: string }>) {
      state.lastName = action.payload.value;
    },
    setMiddleName(state, action: PayloadAction<{ value: string }>) {
      state.middleName = action.payload.value;
    },
    setPhoneNumber(state, action: PayloadAction<{ value: string }>) {
      state.phoneNumber = action.payload.value;
    },
    setEmail(state, action: PayloadAction<{ value: string }>) {
      state.email = action.payload.value;
    },
    setCountry(state, action: PayloadAction<{ value: string }>) {
      state.country = action.payload.value;
    },
    setCity(state, action: PayloadAction<{ value: string }>) {
      state.city = action.payload.value;
    },
    setContractNumber(state, action: PayloadAction<{ value: string }>) {
      state.contractNumber = action.payload.value;
    },
    setTgToken(state, action: PayloadAction<{ value: string }>) {
      state.tgToken = action.payload.value;
    },
    setLogin(state, action: PayloadAction<{ value: string }>) {
      state.login = action.payload.value;
    },
    setPassword(state, action: PayloadAction<{ value: string }>) {
      state.password = action.payload.value;
    },
    setRepeatPassword(state, action: PayloadAction<{ value: string }>) {
      state.repeatPassword = action.payload.value;
    },
  },
});
