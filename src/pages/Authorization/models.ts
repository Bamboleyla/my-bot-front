export interface IAuth {
  login: string;
  password: string;
  showPassword: boolean;
  errorsValidation: { login: string[]; password: string[] };
}
