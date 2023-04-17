import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../entities/store";
import { useFields } from "./data";

describe("useFields", () => {
  const store = setupStore();

  const setup = () => {
    const { result } = renderHook(useFields, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    return result.current();
  };

  it("Должен быть массивом из массивов", () => {
    const getFields = setup();

    expect(Array.isArray(getFields)).toBeTruthy();
  });

  it("Массив должен иметь определенную структуру и свойства", () => {
    const getFields = setup();

    expect(getFields[0]).toHaveLength(1);
    expect(getFields[0][0]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        valueKey: "email",
        setValue: expect.any(Function),
      })
    );

    expect(getFields[1]).toHaveLength(2);

    expect(getFields[1][0]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        valueKey: "password",
        setValue: expect.any(Function),
      })
    );

    expect(getFields[1][1]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        valueKey: "repeatPassword",
        setValue: expect.any(Function),
      })
    );

    expect(getFields[2]).toHaveLength(1);

    expect(getFields[2][0]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        valueKey: "emailCode",
        setValue: expect.any(Function),
      })
    );
  });

  test("setEmail должен вызыватся с оптеделенным аргументом", () => {
    expect.assertions(1);
    const getFields = setup()[0];
    const firstField = getFields[0];
    store.subscribe(() => {
      expect(store.getState().registrationForm.data.email).toEqual({
        value: "test@example.com",
        error: false,
        errorText: "",
      });
    });
    firstField.setValue("test@example.com");
  });

  test("setPassword должен вызыватся с оптеделенным аргументом", () => {
    expect.assertions(2);
    const getFields = setup()[1];
    const firstField = getFields[0];
    store.subscribe(() => {
      expect(store.getState().registrationForm.data.password).toEqual({
        value: "qwe123",
        error: false,
        errorText: "",
      });
    });
    firstField.setValue("qwe123");
  });

  test("setRepeatPassword должен вызыватся с оптеделенным аргументом", () => {
    expect.assertions(3);
    const getFields = setup()[1];
    const firstField = getFields[1];
    store.subscribe(() => {
      expect(store.getState().registrationForm.data.repeatPassword).toEqual({
        value: "qwe111",
        error: false,
        errorText: "",
      });
    });
    firstField.setValue("qwe111");
  });

  test("setEmailCode должен вызыватся с оптеделенным аргументом", () => {
    expect.assertions(4);
    const getFields = setup()[2];
    const firstField = getFields[0];
    store.subscribe(() => {
      expect(store.getState().registrationForm.data.emailCode).toEqual({
        value: "1111",
        error: false,
        errorText: "",
      });
    });
    firstField.setValue("1111");
  });
});
