import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ForgetPassword } from ".";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("ForgetPassword", () => {
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
          <ForgetPassword />
        </Provider>
      </MemoryRouter>
    );

  it("Должен отрендерить компоненты: Progress, FormRegistration, Title", () => {
    setup(store);

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
