import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../entities/store";
import { IgetFields, useFields } from "./data";
import { IRegistrationStateDate } from "../../entities/registration/models";
import { AppStore } from "../../entities/store";

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

    valueKey === "phoneNumber"
      ? getFields[index].setValue(value, "+7")
      : getFields[index].setValue(value);
  };

  it("должен возвращать массив из массивов", () => {
    const getFields = setup();

    expect(Array.isArray(getFields)).toBeTruthy();
  });

  it("каждый вложенный массив должен иметь определенные свойства", () => {
    const getFields = setup();

    expect(getFields[0]).toHaveLength(3);
    expect(getFields[1]).toHaveLength(4);
    expect(getFields[2]).toHaveLength(1);
    expect(getFields[3]).toHaveLength(2);
    expect(getFields[4]).toHaveLength(1);

    check(getFields[0], 0, "lastName", "Иванов");
    check(getFields[0], 1, "firstName", "Иван");
    check(getFields[0], 2, "middleName", "Иванович");
    check(getFields[1], 0, "phoneNumber", "+7(999) 999 9999");
    check(getFields[1], 1, "email", "example@gmail.com");
    check(getFields[1], 2, "country", "Россия");
    check(getFields[1], 3, "city", "Порто");
    check(getFields[2], 0, "tgToken", "456test_Token");
    check(getFields[3], 0, "password", "qwer1234");
    check(getFields[3], 1, "repeatPassword", "4321rewq");
    check(getFields[4], 0, "emailCode", "1111");
  });
});
