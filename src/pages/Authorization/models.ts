export interface IAuth {
  login: { value: string; error: boolean; errorText: string };
  password: { value: string; error: boolean; errorText: string };
  isLoading: string[];
}
