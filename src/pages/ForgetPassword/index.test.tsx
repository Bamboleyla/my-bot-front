import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ForgetPassword } from ".";
import { setup } from "../../shared/forTests";

describe("ForgetPassword", () => {
  it("Должен отрендерить компоненты: Progress, FormRegistration, Title", () => {
    setup(ForgetPassword);

    const forget = screen.getByTestId("ForgetPassword");
    const progress = screen.getByTestId("Progress");
    const form = screen.getByTestId("FormRegistration");
    const title = screen.getByText("Восстановление пароля");

    expect(forget).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
