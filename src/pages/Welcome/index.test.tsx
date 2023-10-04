import { Welcome } from "./index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("YouWillBeAble", () => {
  it("должен отрендерить компоненты, которые помещены на странице, а именно: OurRates, Start,WhatIs,WhoIsItFor,YouWillBeAble", () => {
    render(<Welcome />);
    // console.log(render.debug());

    const header = screen.getByTestId("Header");
    const welcome = screen.getByTestId("Welcome");
    const ourRates = screen.getByTestId("OurRates");
    const start = screen.getByTestId("Start");
    const whatIs = screen.getByTestId("WhatIs");
    const whoIsItFor = screen.getByTestId("WhoIsItFor");
    const youWillBeAble = screen.getByTestId("YouWillBeAble");

    expect(header).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
    expect(ourRates).toBeInTheDocument();
    expect(start).toBeInTheDocument();
    expect(whatIs).toBeInTheDocument();
    expect(whoIsItFor).toBeInTheDocument();
    expect(youWillBeAble).toBeInTheDocument();
  });
});
