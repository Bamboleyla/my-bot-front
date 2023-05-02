import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Authorization } from ".";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import * as router from "react-router";

const mockStore = configureStore([]);

describe("Registration", () => {
  const initialStore = {
    registrationForm: {
      data: {
        firstName: {
          value: "",
          error: false,
          errorText: "",
        },
        lastName: {
          value: "",
          error: false,
          errorText: "",
        },
        middleName: {
          value: "",
          error: false,
          errorText: "",
        },
        phoneNumber: {
          value: "+7",
          error: false,
          errorText: "",
        },
        email: {
          value: "",
          error: false,
          errorText: "",
        },
        country: {
          value: "Россия",
          error: false,
          errorText: "",
        },
        city: {
          value: "",
          error: false,
          errorText: "",
        },
        tgToken: {
          value: "",
          error: false,
          errorText: "",
        },
        password: {
          value: "",
          error: false,
          errorText: "",
        },
        repeatPassword: {
          value: "",
          error: false,
          errorText: "",
        },
        emailCode: {
          value: "",
          error: false,
          errorText: "",
        },
      },
      isLoading: [],
      activeStep: 0,
    },
  };

  const store = mockStore(initialStore);

  type Store = typeof store;

  const setup = (store: Store) =>
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Authorization />
        </Provider>
      </MemoryRouter>
    );

  it("должен отрендерить конмоненты, которые помещены на странице, а именно: logo, email, PasswordField, Вход, Регистрация, Забыли пароль?", () => {
    setup(store);

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

    setup(store);

    const registration = screen.getByText("Регистрация");

    userEvent.click(registration);

    expect(navigate).toHaveBeenCalledWith(`/registration`);
  });
});
