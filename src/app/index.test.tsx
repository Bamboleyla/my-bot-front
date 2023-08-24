import { screen } from "@testing-library/react";
import { App } from "./";
import { setup } from "../shared/forTests";
import "@testing-library/jest-dom";

describe("App", () => {
  it("рендер App с светлой темой браузера", () => {
    window.matchMedia = jest.fn().mockReturnValue(false);
    setup(App);

    expect(screen.getByTestId("App")).toHaveClass("app_light_mode");
    expect(screen.getByTestId("Authorization")).toBeInTheDocument();
  });

  it("рендер App с темной темой браузера", () => {
    window.matchMedia = jest.fn().mockReturnValue(true);
    setup(App);

    expect(screen.getByTestId("App")).toHaveClass("app_dark_mode");
    expect(screen.getByTestId("Authorization")).toBeInTheDocument();
  });
});
