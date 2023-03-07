import { IuseRegistration } from "../../../features/registration";
import { IgetFields } from "../../../pages/Registration/data";

export interface IformValues {
  data: {
    [key: string]: any;
  };
  isLoading: string[];
  activeStep: number;
}

export interface IFormRegistration {
  config: IgetFields[][];
  formValues: IformValues;
  display: IuseRegistration;
}
