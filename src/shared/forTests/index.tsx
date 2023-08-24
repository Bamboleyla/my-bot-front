import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { FC } from "react";
import { render } from "@testing-library/react";

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

const mockStore = configureStore([]);
const initStore = mockStore(initialStore);

type Store = typeof initStore;

export const setup = (Component: FC, store: Store = initStore) => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Component />
      </Provider>
    </MemoryRouter>
  );
};
