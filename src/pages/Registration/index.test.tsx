import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Registration } from ".";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

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
          <Registration />
        </Provider>
      </MemoryRouter>
    );

  it("должен отрендерить конмоненты, которые помещены на странице, а именно: Progress, FormRegistration", () => {
    setup(store);

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
