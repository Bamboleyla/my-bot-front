/* istanbul ignore file */

export interface IResponse {
  success: boolean;
  message: string;
}

export interface IUserDataReq {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  tgToken: string;
  password: string;
}

export interface IUserDataRes {
  firstName: string;
}
