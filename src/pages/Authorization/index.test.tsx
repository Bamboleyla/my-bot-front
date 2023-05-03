import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Authorization } from ".";
import * as router from "react-router";
import { setup } from "../../shared/forTests";

describe("Authorization", () => {
  it("должен отрендерить конмоненты, которые помещены на странице, а именно: logo, email, PasswordField, Вход, Регистрация, Забыли пароль?", () => {
    setup(Authorization);

    const auth = screen.getByTestId("Authorization");
    const img = screen.getByAltText("logo");
    const email = screen.getByLabelText("email");
    const password = screen.getByTestId("PasswordField");
    const entrance = screen.getByText("Вход");
    const registration = screen.getByText("Регистрация");
    const forgetPassword = screen.getByText("Забыли пароль?");

    expect(auth).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(entrance).toBeInTheDocument();
    expect(registration).toBeInTheDocument();
    expect(forgetPassword).toBeInTheDocument();
  });

  it("При клике на кнопку Регистрация, должнен произойти вызов useNavigate с аргументом /registration", () => {
    const navigate = jest.fn();

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    setup(Authorization);

    const registration = screen.getByText("Регистрация");

    userEvent.click(registration);

    expect(navigate).toHaveBeenCalledWith(`/registration`);
  });
});
