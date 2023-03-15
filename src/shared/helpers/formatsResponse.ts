import { AppDispatch } from "../../entities/store";

export const formatsResponse =
  (
    action: any,
    value: string = "",
    text: string = "Поле не может быть пустым"
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(
      action({
        value,
        error: true,
        text,
      })
    );
    return true;
  };
