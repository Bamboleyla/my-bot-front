import { AppDispatch } from "../../entities/store";

export const formatsResponse =
  (
    reducer: any,
    value: string = "",
    text: string = "Поле не может быть пустым"
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(
      reducer({
        value,
        error: true,
        text,
      })
    );
    return true;
  };
