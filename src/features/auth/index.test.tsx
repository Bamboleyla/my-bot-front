import * as router from "react-router";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import * as ReactRedux from "../../app/redux";
import { AppStore, setupStore } from "../../entities/store";
import { useAuth } from ".";

describe("useAuth", () => {
  let store: AppStore;

  beforeEach(() => {
    store = setupStore();
  });

  const setup = (): ReturnType<typeof useAuth> => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    return result.current;
  };

  describe("sendDate", () => {
    it("should dispatch an action with the correct values", () => {
      const navigate = jest.fn();

      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

      const useDispatchMock = jest.fn();
      useDispatchMock.mockReturnValue(store.dispatch);

      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { sendDate } = setup();
      sendDate();

      expect(useDispatchMock).toBeCalled();
    });
  });
});
