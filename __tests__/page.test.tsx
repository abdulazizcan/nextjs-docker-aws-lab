import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage Component", () => {
  it("should render the main heading correctly", () => {
    render(<HomePage />);

    const headingElement = screen.getByRole("heading", {
      name: /Lab-Project v1/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
