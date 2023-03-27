import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { LoginField } from ".";

describe("LoginField", () => {
  const values = { value: "Login", error: false, errorText: "" };
  const setValue = jest.fn();

  test("Присутствие элемента", () => {
    render(<LoginField values={values} setValues={setValue} />);
    const contentInput = screen.getByTestId("content-input");

    expect(contentInput).toBeInTheDocument();
  });

  test("вызов onChange", () => {
    render(<LoginField values={values} setValues={setValue} />);
    const contentInput = screen.getByTestId("content-input");

    userEvent.type(contentInput, "foo");

    expect(setValue).toHaveBeenCalled();
    expect(setValue).toBeCalledTimes(3);
    expect(setValue).toHaveBeenCalledWith("Loginf");
    expect(setValue).toHaveBeenCalledWith("Logino");
    expect(setValue).toHaveBeenLastCalledWith("Logino");
  });
});
