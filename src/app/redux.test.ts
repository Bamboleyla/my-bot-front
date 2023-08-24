import { useAppDispatch } from "./redux";
import { useDispatch } from "react-redux";

jest.mock("react-redux");

describe("useAppDispatch", () => {
  const useDispatchMock = useDispatch as jest.Mock;

  it("должен произойти вызов useDispatch", () => {
    useAppDispatch();

    expect(useDispatchMock).toHaveBeenCalled();
  });
});
