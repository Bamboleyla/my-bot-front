import { YouWillBeAble } from "./index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("YouWillBeAble", () => {
  it("должен отрендерить компоненты, которые помещены на странице, а именно: OurRates, Start,WhatIs,WhoIsItFor,YouWillBeAble", () => {
    render(<YouWillBeAble />);
    console.log(render.debug());

    const youWillBeAble = screen.getByTestId("YouWillBeAble");
    const titleFromWelcome = screen.getByTestId("TitleFromWelcome");

    expect(youWillBeAble).toBeInTheDocument();
    expect(titleFromWelcome).toBeInTheDocument();
  });
});
