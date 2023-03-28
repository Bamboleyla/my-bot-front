import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldsSkeleton } from ".";

describe("FieldsSkeleton", () => {
  test("Отрисовка в DOM", () => {
    render(<FieldsSkeleton />);

    const skeleton = screen.getAllByTestId("skeleton");

    expect(skeleton.length).toBe(3);
  });
});
