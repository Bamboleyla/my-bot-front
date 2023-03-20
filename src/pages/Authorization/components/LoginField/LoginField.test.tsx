import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginField } from ".";

describe("LoginField", () => {
  render(
    <LoginField
      values={{ value: "Login", error: false, errorText: "" }}
      setValues={() => {}}
    />
  );
  const input = screen.getByDisplayValue("Login");
  const label = screen.getByLabelText("email");

  test("Присутствие элементов", () => {
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
