import { IRegistrationState } from "./models";

export const initialState: IRegistrationState = {
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
    emailCode: { value: "", error: false, errorText: "" },
  },
  isLoading: [],
  activeStep: 4,
};
