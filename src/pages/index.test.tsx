import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../entities/store";
import "@testing-library/jest-dom";
import { Routing } from ".";
import { MemoryRouter } from "react-router-dom";

describe("Routing component", () => {
  const store = setupStore();

  const setup = (path: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </MemoryRouter>
    );

  test("render Index element", () => {
    setup("/");

    const authElement = screen.getByTestId("Authorization");
    const forgetPassword = screen.queryByTestId("ForgetPassword");
    const registration = screen.queryByTestId("Registration");
    const main = screen.queryByTestId("Main");

    expect(authElement).toBeInTheDocument();
    expect(forgetPassword).not.toBeInTheDocument();
    expect(registration).not.toBeInTheDocument();
    expect(main).not.toBeInTheDocument();
  });

  test("render Authorization page", () => {
    setup("/auth");

    const authElement = screen.getByTestId("Authorization");
    const forgetPassword = screen.queryByTestId("ForgetPassword");
    const registration = screen.queryByTestId("Registration");
    const main = screen.queryByTestId("Main");

    expect(authElement).toBeInTheDocument();
    expect(forgetPassword).not.toBeInTheDocument();
    expect(registration).not.toBeInTheDocument();
    expect(main).not.toBeInTheDocument();
  });

  test("render ForgetPassword page", () => {
    setup("/forgetPassword");

    const authElement = screen.queryByTestId("Authorization");
    const forgetPassword = screen.getByTestId("ForgetPassword");
    const registration = screen.queryByTestId("Registration");
    const main = screen.queryByTestId("Main");

    expect(authElement).not.toBeInTheDocument();
    expect(forgetPassword).toBeInTheDocument();
    expect(registration).not.toBeInTheDocument();
    expect(main).not.toBeInTheDocument();
  });

  test("render Registration page", () => {
    setup("/registration");

    const authElement = screen.queryByTestId("Authorization");
    const forgetPassword = screen.queryByTestId("ForgetPassword");
    const registration = screen.getByTestId("Registration");
    const main = screen.queryByTestId("Main");

    expect(authElement).not.toBeInTheDocument();
    expect(forgetPassword).not.toBeInTheDocument();
    expect(registration).toBeInTheDocument();
    expect(main).not.toBeInTheDocument();
  });

  test("render Main page", () => {
    setup("/main");

    const authElement = screen.queryByTestId("Authorization");
    const forgetPassword = screen.queryByTestId("ForgetPassword");
    const registration = screen.queryByTestId("Registration");
    const main = screen.getByTestId("Main");

    expect(authElement).not.toBeInTheDocument();
    expect(forgetPassword).not.toBeInTheDocument();
    expect(registration).not.toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
