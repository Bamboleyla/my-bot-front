import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldsSkeleton } from ".";

describe("FieldsSkeleton", () => {
  test("Отрисовка в DOM", () => {
    render(<FieldsSkeleton />);
    const item0 = screen.getByTestId("skeleton 0");
    const item1 = screen.getByTestId("skeleton 1");
    const item2 = screen.getByTestId("skeleton 2");
    expect(item0).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
