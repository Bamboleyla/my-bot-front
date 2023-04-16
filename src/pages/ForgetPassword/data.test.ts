import { renderHook } from "@testing-library/react";
import { useFields } from "./data";
import * as useAppDispatch from "../../app/redux";

describe("useFields", () => {
  const useDispatchMock = jest.spyOn(useAppDispatch, "useAppDispatch");
  useDispatchMock.mockReturnValue(jest.fn());

  const setup = () => {
    const { result } = renderHook(() => useFields());

    return result.current();
  };

  it("Должен быть массивом массивов", () => {
    const getFields = setup();

    expect(Array.isArray(getFields)).toBeTruthy();
    expect(getFields.length).toBe(3);
    expect(useDispatchMock).toBeCalled();
  });

  it("Миссив с индексом 0 должен иметь определенные свойства и структуру", () => {
    const getFields = setup()[0];

    expect(getFields.length).toBe(1);
    expect(typeof getFields[0].label).toBe("string");
    expect(getFields[0].valueKey).toBe("email");
    expect(typeof getFields[0].setValue).toBe("function");
  });

  it("Миссив с индексом 1 должен иметь определенные свойства и структуру", () => {
    const getFields = setup()[1];

    expect(getFields.length).toBe(2);
    expect(typeof getFields[0].label).toBe("string");
    expect(getFields[0].valueKey).toBe("password");
    expect(typeof getFields[0].setValue).toBe("function");

    expect(typeof getFields[1].label).toBe("string");
    expect(getFields[1].valueKey).toBe("repeatPassword");
    expect(typeof getFields[1].setValue).toBe("function");
  });

  it("Миссив с индексом 2 должен иметь определенные свойства и структуру", () => {
    const getFields = setup()[2];

    expect(getFields.length).toBe(1);
    expect(typeof getFields[0].label).toBe("string");
    expect(getFields[0].valueKey).toBe("emailCode");
    expect(typeof getFields[0].setValue).toBe("function");
  });
});
