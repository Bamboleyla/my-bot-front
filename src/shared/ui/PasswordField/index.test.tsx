import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordField } from ".";
import userEvent from "@testing-library/user-event";

describe("PasswordField", () => {
  const setValue = jest.fn((string) => console.log(string));
  const config = {
    fieldData: { value: "Abc123", error: false, errorText: "" },
    label: "Password",
    setValue,
  };

  render(<PasswordField config={config} />);
  const label = screen.getByText("Password");
  const input = screen.getByDisplayValue("Abc123");
  const button = screen.getByTestId("VisibilityIcon");

  test("Присутствие в DOM", () => {
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("Ввод данных пользователем и отработка onChange на ввод каждого символа", () => {
    render(<PasswordField config={config} />);
    const muiInput = screen.getByTestId("content-input");

    userEvent.type(muiInput, "Hello!");

    expect(config.setValue).toBeCalledTimes(6);
    expect(config.setValue).toHaveBeenCalledWith("Abc123H", "Abc123");
    expect(config.setValue).toHaveBeenCalledWith("Abc123e", "Abc123");
    expect(config.setValue).toHaveBeenCalledWith("Abc123l", "Abc123");
    expect(config.setValue).toHaveBeenCalledWith("Abc123o", "Abc123");
    expect(config.setValue).toHaveBeenLastCalledWith("Abc123!", "Abc123");
  });

  test("Показать/скрыть пароль", () => {
    render(<PasswordField config={config} />);
    // Изначально VisibilityIcon активна, а VisibilityOffIcon отсутствует
    const showPassword = screen.getByTestId("VisibilityIcon");
    const hiddenPassword = screen.queryByTestId("VisibilityOffIcon");
    const input = screen.getByTestId("content-input");

    expect(showPassword).toBeInTheDocument();
    expect(hiddenPassword).not.toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");

    // после нажатия на VisibilityIcon...
    userEvent.click(showPassword);

    // VisibilityIcon заменяется на VisibilityOffIcon
    const showPasswordIcon = screen.queryByTestId("VisibilityIcon");
    const hiddenPasswordIcon = screen.getByTestId("VisibilityOffIcon");

    expect(showPasswordIcon).not.toBeInTheDocument();
    expect(hiddenPasswordIcon).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });
});
