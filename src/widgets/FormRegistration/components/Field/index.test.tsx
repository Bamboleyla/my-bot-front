import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Field } from ".";

describe("Field", () => {
  const formValues = {
    data: {
      firstName: {
        value: "",
        error: false,
        errorText: "",
      },
    },
    isLoading: [],
    activeStep: 0,
  };

  const setValue = jest.fn();

  test("Отрисовка Field в DOM при disabled=undefined и проверка срабатывания setValue на ввод текста", () => {
    render(
      <Field
        formValues={formValues}
        label="Имя"
        valueKey="firstName"
        setValue={setValue}
      />
    );

    const label = screen.getByText("Имя");
    const input = screen.getByDisplayValue("");
    const PasswordField = screen.queryByTestId("PasswordField");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(PasswordField).not.toBeInTheDocument();
    expect(input).toHaveClass(
      "MuiInputBase-input MuiFilledInput-input css-10botns-MuiInputBase-input-MuiFilledInput-input"
    );

    userEvent.type(input, "Hello!");

    expect(setValue).toHaveBeenCalledTimes(6);
    expect(setValue).toHaveBeenCalledWith("H", "");
    expect(setValue).toHaveBeenCalledWith("e", "");
    expect(setValue).toHaveBeenCalledWith("l", "");
    expect(setValue).toHaveBeenCalledWith("o", "");
    expect(setValue).toHaveBeenCalledWith("!", "");
  });

  test("Отрисовка Field в DOM при disabled=false и проверка срабатывания setValue на ввод текста", () => {
    render(
      <Field
        disabled={false}
        formValues={formValues}
        label="Имя"
        valueKey="firstName"
        setValue={setValue}
      />
    );

    const label = screen.getByText("Имя");
    const input = screen.getByDisplayValue("");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "MuiInputBase-input MuiFilledInput-input css-10botns-MuiInputBase-input-MuiFilledInput-input"
    );

    userEvent.type(input, "Hello!");

    expect(setValue).toHaveBeenCalledTimes(6);
    expect(setValue).toHaveBeenCalledWith("H", "");
    expect(setValue).toHaveBeenCalledWith("e", "");
    expect(setValue).toHaveBeenCalledWith("l", "");
    expect(setValue).toHaveBeenCalledWith("o", "");
    expect(setValue).toHaveBeenCalledWith("!", "");
  });

  test("Отрисовка Field в DOM при disabled=true и запрета на ввод текста", () => {
    render(
      <Field
        disabled={true}
        formValues={formValues}
        label="Имя"
        valueKey="firstName"
        setValue={setValue}
      />
    );

    const label = screen.getByText("Имя");
    const input = screen.getByDisplayValue("");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "MuiInputBase-input MuiFilledInput-input css-10botns-MuiInputBase-input-MuiFilledInput-input"
    );
    expect(input).toHaveAttribute("disabled", "");

    userEvent.type(input, "Hello!");

    expect(setValue).not.toHaveBeenCalled();
  });

  describe('Проверка отрисовки PasswordField вместо TextField, при valueKey === "password" || "repeatPassword"', () => {
    const formValues = [
      {
        data: {
          password: {
            value: "qwer",
            error: false,
            errorText: "",
          },
        },
        isLoading: [],
        activeStep: 0,
        label: "Пароль",
        valueKey: "password",
      },
      {
        data: {
          repeatPassword: {
            value: "qwer",
            error: false,
            errorText: "",
          },
        },
        isLoading: [],
        activeStep: 0,
        label: "Повтор пароля",
        valueKey: "repeatPassword",
      },
    ];

    formValues.forEach((formValue) => {
      test(`valueKey === ${formValue.valueKey}`, () => {
        render(
          <Field
            formValues={formValue}
            label={formValue.label}
            valueKey={formValue.valueKey}
            setValue={setValue}
          />
        );

        const MUItextField = screen.queryByTestId("MUItextField");
        const PasswordField = screen.getByTestId("PasswordField");

        expect(MUItextField).not.toBeInTheDocument();
        expect(PasswordField).toBeInTheDocument();
      });
    });
  });

  describe("Проверка отрисовки TextField и отсутствия PasswordField, при valueKey равных одному из значений [ firstName, lastName, middleName, phoneNumber, email, country, city, tgToken, password, lastName, emailCode]", () => {
    const listValueKey = [
      "firstName",
      "lastName",
      "middleName",
      "phoneNumber",
      "email",
      "country",
      "city",
      "tgToken",
      "lastName",
      "emailCode",
    ];

    const formValues = listValueKey.map((item) => ({
      data: {
        [item]: {
          value: "qwer",
          error: false,
          errorText: "",
        },
      },
      isLoading: [],
      activeStep: 0,
      label: "Test",
      valueKey: item,
    }));

    formValues.forEach((formValue) => {
      test(`valueKey === ${formValue.valueKey}`, () => {
        render(
          <Field
            formValues={formValue}
            label={formValue.label}
            valueKey={formValue.valueKey}
            setValue={setValue}
          />
        );

        const MUItextField = screen.getByTestId("MUItextField");
        const PasswordField = screen.queryByTestId("PasswordField");

        expect(MUItextField).toBeInTheDocument();
        expect(PasswordField).not.toBeInTheDocument();
      });
    });
  });

  test("Отрисовка ошибки у Field при disabled=undefined  error=true", () => {
    const formValues = {
      data: {
        firstName: {
          value: "Петя1",
          error: true,
          errorText: "В имени нельзя использовать цифры",
        },
      },
      isLoading: [],
      activeStep: 0,
    };

    render(
      <Field
        formValues={formValues}
        label="Имя"
        valueKey="firstName"
        setValue={setValue}
      />
    );

    const helperText = screen.getByText("В имени нельзя использовать цифры");

    expect(helperText).toHaveAttribute("id", "firstName-helper-text");
  });
});
