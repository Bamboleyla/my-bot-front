import { formatsResponse } from "./formatsResponse";

describe("formatsResponse", () => {
  let mockDispatch: any;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it("должен диспачить экшен с корректными параметрами", () => {
    const expectedAction = {
      value: "testValue",
      error: true,
      text: "testText",
    };
    const testAction = jest.fn().mockReturnValue(expectedAction);
    const testValue = "testValue";
    const testText = "testText";

    formatsResponse(testAction, testValue, testText)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(testAction(expectedAction));
  });

  it("при отсутствии параметров должен диспатчить экшен с определенными параметрами", () => {
    const expectedAction = {
      value: "",
      error: true,
      text: "Поле не может быть пустым",
    };
    const testAction = jest.fn().mockReturnValue(expectedAction);

    formatsResponse(testAction)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(testAction(expectedAction));
  });

  it("должен вернуть true", () => {
    const result = formatsResponse(
      jest.fn(),
      "testValue",
      "testText"
    )(mockDispatch);

    expect(result).toBe(true);
  });
});
