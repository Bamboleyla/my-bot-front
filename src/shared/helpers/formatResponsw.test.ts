import { formatsResponse } from "./formatsResponse";

describe("formatsResponse function", () => {
  let mockDispatch: any;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it("should dispatch action with correct params", () => {
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

  it("should return true", () => {
    const result = formatsResponse(
      jest.fn(),
      "testValue",
      "testText"
    )(mockDispatch);

    expect(result).toBe(true);
  });
});
