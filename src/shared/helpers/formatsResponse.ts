import { AppDispatch } from "../../entities/store";

export const formatsResponse =
  (
    isThereError: boolean,
    action: any,
    value: string = "",
    text: string = "Поле не может быть пустым"
  ) =>
  (dispatch: AppDispatch) => {
    isThereError = true;
    dispatch(
      action({
        value,
        error: true,
        text,
      })
    );
  };
