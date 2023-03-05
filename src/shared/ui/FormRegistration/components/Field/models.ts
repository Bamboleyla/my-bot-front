export interface IformValues {
  data: {
    [key: string]: any;
  };
  isLoading: string[];
  activeStep: number;
}

export interface IField {
  disabled?: boolean | undefined;
  label: string;
  valueKey: string;
  setValue: Function;
  formValues: IformValues;
}
