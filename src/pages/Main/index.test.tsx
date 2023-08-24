import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Main } from ".";

describe("Main", () => {
  test("отрисовка Main в DOM", () => {
    render(<Main />);
    const content = screen.getByText("Main Page Welcome");

    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("main");
  });
});
