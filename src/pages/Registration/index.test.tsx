import { screen } from "@testing-library/react";
import { Registration } from ".";
import "@testing-library/jest-dom";
import { setup } from "../../shared/forTests";

describe("Registration", () => {
  it("должен отрендерить конмоненты, которые помещены на странице, а именно: Progress, FormRegistration", () => {
    setup(Registration);

    const registration = screen.getByTestId("Registration");
    const progress = screen.getByTestId("Progress");
    const form = screen.getByTestId("FormRegistration");
    const title = screen.getByText("Регистрация");

    expect(registration).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
