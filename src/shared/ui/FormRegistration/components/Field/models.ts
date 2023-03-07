import { IformValues } from "../../models";

export interface IField {
  disabled?: boolean | undefined;
  label: string;
  valueKey: string;
  setValue: Function;
  formValues: IformValues;
}
