import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Fields } from ".";

describe("Fields", () => {
  const setValue = jest.fn();

  const config = [
    [
      {
        label: "Фамилия",
        valueKey: "lastName",
        setValue,
      },
      {
        label: "Имя",
        valueKey: "firstName",
        setValue,
      },
      {
        label: "Отчество",
        valueKey: "middleName",
        setValue,
      },
    ],
    [
      {
        label: "Телефон",
        valueKey: "phoneNumber",
        setValue,
      },
      {
        label: "Email",
        valueKey: "email",
        setValue,
      },
      {
        disabled: true,
        label: "Страна",
        valueKey: "country",
        setValue,
      },
      {
        label: "Город",
        valueKey: "city",
        setValue,
      },
    ],
  ];

  const data = {
    data: {
      firstName: {
        value: "Иван",
        error: false,
        errorText: "",
      },
      lastName: {
        value: "Иванов",
        error: false,
        errorText: "",
      },
      middleName: {
        value: "Иванович",
        error: false,
        errorText: "",
      },
      phoneNumber: {
        value: "+7",
        error: false,
        errorText: "",
      },
      email: {
        value: "gmail",
        error: false,
        errorText: "",
      },
      country: {
        value: "Россия",
        error: false,
        errorText: "",
      },
      city: {
        value: "Уфа",
        error: false,
        errorText: "",
      },
    },
    isLoading: [],
    activeStep: 0,
  };

  test("Отрисовка в DOM isLoading= [] activeStep= 0", () => {
    render(<Fields config={config} formValues={data} />);

    const firstNameInput = screen.getByDisplayValue("Иван");
    const lastNameInput = screen.getByDisplayValue("Иванов");
    const middleNameInput = screen.getByDisplayValue("Иванович");
    const firstNameLabel = screen.getByText("Имя");
    const lastNameLabel = screen.getByText("Фамилия");
    const middleNameLabel = screen.getByText("Отчество");

    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameLabel).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameLabel).toBeInTheDocument();
    expect(middleNameInput).toBeInTheDocument();
    expect(middleNameLabel).toBeInTheDocument();
  });

  test("Отрисовка в DOM isLoading= [] activeStep= 1", () => {
    const copyData = { ...data, activeStep: 1 };

    render(<Fields config={config} formValues={copyData} />);

    const phoneNumberInput = screen.getByDisplayValue("+7");
    const phoneNumberLabel = screen.getByText("Телефон");
    const emailInput = screen.getByDisplayValue("gmail");
    const emailLabel = screen.getByText("Email");
    const countryInput = screen.getByDisplayValue("Россия");
    const countryLabel = screen.getByText("Страна");
    const cityInput = screen.getByDisplayValue("Уфа");
    const cityLabel = screen.getByText("Город");

    expect(phoneNumberInput).toBeInTheDocument();
    expect(phoneNumberLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(countryLabel).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(cityLabel).toBeInTheDocument();
  });

  test("Отрисовка компонента Skeleton в DOM если isLoading= ['LoadingData'] activeStep= 1", () => {
    const copyData = { ...data, isLoading: ["LoadingData"] };

    render(<Fields config={config} formValues={copyData} />);

    const MUItextField = screen.queryAllByTestId("MUItextField");
    const sceleton = screen.getAllByTestId("skeleton");

    expect(MUItextField.length).toBe(0);
    expect(sceleton.length).toBe(3);
  });
});
