import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Test-a/i);
  expect(linkElement).toBeInTheDocument();
});
