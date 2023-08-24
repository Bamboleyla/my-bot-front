import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Buttons } from ".";

describe("Buttons", () => {
  const previousStep = jest.fn();
  const nextStep = jest.fn();
  const getLoadingStatus = jest.fn();
  const getButtonTitle = jest.fn(() => "Вперёд");

  test("Отрисовка Buttons в DOM , кнопки активны и могут быть нажаты", () => {
    getButtonTitle.mockReturnValue("Вперёд");

    render(
      <Buttons
        getLoadingStatus={getLoadingStatus}
        previousStep={previousStep}
        nextStep={nextStep}
        getButtonTitle={getButtonTitle}
      />
    );

    const buttonBack = screen.getByText("Назад");
    const buttonForward = screen.getByText("Вперёд");

    expect(buttonBack).toBeInTheDocument();
    expect(buttonForward).toBeInTheDocument();

    expect(buttonForward).not.toHaveAttribute("disabled");
    expect(buttonForward).toHaveAttribute("tabindex", "0");
    expect(buttonBack).not.toHaveAttribute("disabled");
    expect(buttonBack).toHaveAttribute("tabindex", "0");
  });

  test("Нажатие кнопки Назад, отработка previousStep()", () => {
    render(
      <Buttons
        getLoadingStatus={getLoadingStatus}
        previousStep={previousStep}
        nextStep={nextStep}
        getButtonTitle={getButtonTitle}
      />
    );

    const buttonBack = screen.getByText("Назад");

    userEvent.click(buttonBack);

    expect(previousStep).toHaveBeenCalledTimes(1);
    expect(nextStep).not.toHaveBeenCalled();
  });

  test("Нажатие кнопки Вперёд, отработка nextStep()", () => {
    getButtonTitle.mockReturnValue("Вперёд");

    render(
      <Buttons
        getLoadingStatus={getLoadingStatus}
        previousStep={previousStep}
        nextStep={nextStep}
        getButtonTitle={getButtonTitle}
      />
    );

    const buttonForward = screen.getByText("Вперёд");

    userEvent.click(buttonForward);

    expect(previousStep).not.toHaveBeenCalled();
    expect(nextStep).toHaveBeenCalledTimes(1);
  });

  test("Блокировка нажатия кнопок при  getLoadingStatus()===true", () => {
    getButtonTitle.mockReturnValue("Вперёд");
    getLoadingStatus.mockReturnValue(true);

    render(
      <Buttons
        getLoadingStatus={getLoadingStatus}
        previousStep={previousStep}
        nextStep={nextStep}
        getButtonTitle={getButtonTitle}
      />
    );

    const buttonForward = screen.getByText("Вперёд");
    const buttonBack = screen.getByText("Назад");

    /* Т.к. кнопка имеет disabled="" и tabindex="-1" по ней не возможно нажать, хоть она и отображена
В таком случае событие userEvent.click вернет ошибку, для отключения такого поведения добавляем {skipPointerEventsCheck: true} */
    userEvent.click(buttonForward, undefined, { skipPointerEventsCheck: true });
    userEvent.click(buttonBack, undefined, { skipPointerEventsCheck: true });

    expect(previousStep).not.toHaveBeenCalled();
    expect(nextStep).not.toHaveBeenCalled();
    expect(buttonForward).toHaveAttribute("disabled", "");
    expect(buttonForward).toHaveAttribute("tabindex", "-1");
    expect(buttonBack).toHaveAttribute("disabled", "");
    expect(buttonBack).toHaveAttribute("tabindex", "-1");
  });
});
