import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormRegistration } from ".";

describe("FormRegistration", () => {
  const formValues = {
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
    },
    isLoading: [],
    activeStep: 0,
  };

  const config = [
    [
      {
        label: "Фамилия",
        valueKey: "lastName",
        setValue: () => {},
      },
      {
        label: "Имя",
        valueKey: "firstName",
        setValue: () => {},
      },
      {
        label: "Отчество",
        valueKey: "middleName",
        setValue: () => {},
      },
    ],
    [
      {
        label: "Телефон",
        valueKey: "phoneNumber",
        setValue: () => {},
      },
      {
        label: "Email",
        valueKey: "email",
        setValue: () => {},
      },
      {
        disabled: true,
        label: "Страна",
        valueKey: "country",
        setValue: () => {},
      },
      {
        label: "Город",
        valueKey: "city",
        setValue: () => {},
      },
    ],
  ];

  const display = {
    nextStep: () => {},
    getLoadingStatus: () => false,
    previousStep: () => {},
    getButtonTitle: () => "Вперёд",
  };

  test("отрисовка FormRegistration в DOM activeStep: 0", () => {
    render(
      <FormRegistration
        formValues={formValues}
        config={config}
        display={display}
      />
    );

    const MUItextField = screen.getAllByTestId("MUItextField");
    const Fields = screen.getByTestId("Fields");
    const Buttons = screen.getByTestId("Buttons");

    expect(MUItextField.length).toBe(3);
    expect(Fields).toBeInTheDocument();
    expect(Buttons).toBeInTheDocument();
  });

  test("отрисовка FormRegistration в DOM activeStep: 1", () => {
    const copyFormValues = { ...formValues, activeStep: 1 };
    render(
      <FormRegistration
        formValues={copyFormValues}
        config={config}
        display={display}
      />
    );

    const MUItextField = screen.getAllByTestId("MUItextField");
    const Fields = screen.getByTestId("Fields");
    const Buttons = screen.getByTestId("Buttons");

    expect(MUItextField.length).toBe(4);
    expect(Fields).toBeInTheDocument();
    expect(Buttons).toBeInTheDocument();
  });
});
