/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Progress } from ".";

describe("Progress", () => {
  const activeStep = 0;
  const steps = ["Шаг1", "Шаг2", "Шаг3"];

  render(<Progress steps={steps} activeStep={activeStep} />);

  const step1 = screen.getByText("1");
  const step2 = screen.getByText("2");
  const step3 = screen.getByText("3");

  test("Присутствие элементов", () => {
    const progress = screen.getByTestId("Progress");

    expect(progress).toBeInTheDocument();
    expect(step1).toBeInTheDocument();
    expect(step2).toBeInTheDocument();
    expect(step3).toBeInTheDocument();
  });

  it("Шаг 1 активен? Шаг 2 и 3 нет?", () => {
    expect(step1.parentElement).toHaveStyle({ color: "#1976d2" });
    expect(step2.parentElement).not.toHaveStyle(`color: #1976d2`);
    expect(step3.parentElement).not.toHaveStyle(`color: #1976d2`);
  });

  it("Шаг 2 активен? Шаг 1 пройден а 3 нет?", () => {
    render(<Progress steps={steps} activeStep={1} />);

    const step1 = screen.queryByText("1");
    const step2 = screen.getByText("2");
    const step3 = screen.getByText("3");

    expect(step1).toBeNull();
    expect(step2.parentElement).toHaveStyle(`color: #1976d2`);
    expect(step3.parentElement).not.toHaveStyle(`color: #1976d2`);
  });
});
