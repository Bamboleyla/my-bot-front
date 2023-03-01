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
    emailCode: { value: string; error: boolean; errorText: string };
  };
  isLoading: string[];
  activeStep: number;
}
