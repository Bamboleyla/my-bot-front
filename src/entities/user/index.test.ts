import { initialState } from "./initialState";
import { userSlice } from ".";

describe("userSlice", () => {
  const { addLoadingProcess, deleteLoadingProcess, setDarkBrowserMode } =
    userSlice.actions;

  const state = {
    isLoading: [],
    isDarkBrowserModeEnabled: true,
  };

  it("При отсутствия в аргументах state должен вернуть initialstate", () => {
    const result = userSlice.reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });
  it("При присутствии в аргументах state должен вернуть state", () => {
    const result = userSlice.reducer(state, { type: "" });
    expect(result).not.toEqual(initialState);
  });
  test("setDarkBrowserMode", () => {
    const action = {
      type: setDarkBrowserMode.type,
      payload: { value: false },
    };
    const result = userSlice.reducer(state, action);
    expect(result.isDarkBrowserModeEnabled).toBeFalsy();
  });
  test("addLoadingProcess", () => {
    const action = {
      type: addLoadingProcess.type,
      payload: {
        value: "DownLoadUserName",
      },
    };
    const result = userSlice.reducer(state, action);
    expect(result.isLoading[0]).toBe("DownLoadUserName");
    expect(result.isLoading).toHaveLength(1);
  });
  test("deleteLoadingProcess", () => {
    const addAction = {
      type: addLoadingProcess.type,
      payload: {
        value: "DownLoadUserName",
      },
    };
    const deleteAction = {
      type: deleteLoadingProcess.type,
      payload: {
        value: "DownLoadUserName",
      },
    };
    const stateAfterAdd = userSlice.reducer(state, addAction);
    expect(stateAfterAdd.isLoading[0]).toBe("DownLoadUserName");
    expect(stateAfterAdd.isLoading).toHaveLength(1);
    const result = userSlice.reducer(stateAfterAdd, deleteAction);
    expect(result.isLoading[0]).not.toBe("DownLoadUserName");
    expect(result.isLoading).toHaveLength(0);
  });
});
