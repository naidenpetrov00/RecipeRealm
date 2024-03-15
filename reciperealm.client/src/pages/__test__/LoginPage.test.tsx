import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../identity/LoginPage";

jest.mock("../../customHooks/identity", () => ({
  useLoginUser: jest.fn(() => {
    return { loginHandler: jest.fn() };
  }),
}));

test("renders form", async () => {
  render(<LoginPage />);
  const formElement = screen.getByText("Login");
  expect(formElement).toBeInTheDocument();
});
