/* istanbul ignore file */
export interface IRegistrationState {
  data: IRegistrationStateDate;
  isLoading: string[];
  activeStep: number;
}

export interface IRegistrationStateDate {
  firstName: IRegistrationStateDateItem;
  lastName: IRegistrationStateDateItem;
  middleName: IRegistrationStateDateItem;
  phoneNumber: IRegistrationStateDateItem;
  email: IRegistrationStateDateItem;
  country: IRegistrationStateDateItem;
  city: IRegistrationStateDateItem;
  tgToken: IRegistrationStateDateItem;
  password: IRegistrationStateDateItem;
  repeatPassword: IRegistrationStateDateItem;
  emailCode: IRegistrationStateDateItem;
}

export interface IRegistrationStateDateItem {
  value: string;
  error: boolean;
  errorText: string;
}
