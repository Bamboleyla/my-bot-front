import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "../../entities/store";
import { IgetFields, useFields } from "./data";
import { IRegistrationStateDate } from "../../entities/registration/models";

describe("useFields", () => {
  let store: AppStore;

  beforeEach(() => {
    store = setupStore();
  });

  const setup = () => {
    const { result } = renderHook(useFields, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    return result.current();
  };

  const check = (
    getFields: IgetFields[],
    index: number,
    valueKey: keyof IRegistrationStateDate,
    value: string
  ) => {
    expect(getFields[index]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        valueKey,
        setValue: expect.any(Function),
      })
    );

    store.subscribe(() =>
      expect(store.getState().registrationForm.data[valueKey]).toEqual({
        value,
        error: false,
        errorText: "",
      })
    );

    getFields[index].setValue(value);
  };

  it("должен возвращать массив из массивов", () => {
    const getFields = setup();

    expect(Array.isArray(getFields)).toBeTruthy();
  });

  it("каждый вложенный массив должен иметь определенные свойства", () => {
    const getFields = setup();

    expect(getFields[0]).toHaveLength(1);
    expect(getFields[1]).toHaveLength(2);
    expect(getFields[2]).toHaveLength(1);

    check(getFields[0], 0, "email", "example@gmail.com");
    check(getFields[1], 0, "password", "qwer1234");
    check(getFields[1], 1, "repeatPassword", "4321rewq");
    check(getFields[2], 0, "emailCode", "1111");
  });
});
