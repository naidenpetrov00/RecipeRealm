import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import { BrowserRouter, redirect } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

import LoginPage from "../LoginPage";
import {
  InvalidInputErrorMessges,
  InvalidInputErrorTypes,
} from "../../../abstractions/identity";
import { useLoginUser } from "../../../customHooks/identity";

jest.mock("../../../customHooks/identity");
const useLoginUserMocked = useLoginUser as jest.Mock;
useLoginUserMocked.mockReturnValue({
  loginHandler: jest.fn(),
});

jest.mock("react-hook-form");
const useFormMocked = useForm as jest.Mock;

beforeEach(() => {
  useFormMocked.mockReturnValue({
    register: jest.fn(),
    handleSubmit: jest.fn(() => {}),
    formState: {
      errors: {},
    },
  });
});
const addError = (
  type: InvalidInputErrorTypes,
  message: InvalidInputErrorMessges
) => {
  useFormMocked().formState.errors = {
    [type]: { message },
  };
};

describe("LoginPage Component", () => {
  describe.skip("renders", () => {
    test("input fields", async () => {
      render(<LoginPage />, { wrapper: BrowserRouter });
      const emailInput = screen.getByLabelText("Email address");
      const passwordInput = screen.getByLabelText("Password");
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    test("Sign In button", () => {
      render(<LoginPage />, { wrapper: BrowserRouter });
      const submitButton = screen.getByText("Sign In");
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  describe.skip("display error message for", () => {
    test("invalid email", async () => {
      addError("email", InvalidInputErrorMessges.InvalidEmail);
      render(<LoginPage />, { wrapper: BrowserRouter });
      const emailInput = screen.getByLabelText("Email address");
      userEvent.type(emailInput, "invalidemail");
      emailInput.blur();
      const errorMeassageElement = await screen.findByText(
        InvalidInputErrorMessges.InvalidEmail
      );
      expect(errorMeassageElement).toBeInTheDocument();
      userEvent.clear(emailInput);
    });

    test("required email", async () => {
      addError("email", InvalidInputErrorMessges.EmptyInput);
      render(<LoginPage />, { wrapper: BrowserRouter });
      const emailInput = screen.getByLabelText("Email address");
      userEvent.click(emailInput);
      emailInput.blur();
      const errorMeassageElement = await screen.findByText(
        InvalidInputErrorMessges.EmptyInput
      );
      expect(errorMeassageElement).toBeInTheDocument();
    });

    test("invalid password", async () => {
      addError("password", InvalidInputErrorMessges.MinLength8);
      render(<LoginPage />, { wrapper: BrowserRouter });
      const passwordInput = screen.getByLabelText("Password");
      userEvent.type(passwordInput, "tes");
      passwordInput.blur();
      const errorMeassageElement = await screen.findByText(
        InvalidInputErrorMessges.MinLength8
      );
      expect(errorMeassageElement).toBeInTheDocument();
      userEvent.clear(passwordInput);
    });

    test("required password", async () => {
      addError("password", InvalidInputErrorMessges.EmptyInput);
      render(<LoginPage />, { wrapper: BrowserRouter });
      const passwordInput = screen.getByLabelText("Password");
      userEvent.click(passwordInput);
      passwordInput.blur();
      const errorMeassageElement = await screen.findByText(
        InvalidInputErrorMessges.EmptyInput
      );
      expect(errorMeassageElement).toBeInTheDocument();
    });
  });

  describe("login form", () => {
    const url = "http://localhost/login";
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {},
      writable: true,
    });
    Object.defineProperty(window.location, "href", {
      value: url,
      writable: true,
    });
    Object.defineProperty(window.location, "origin", {
      value: "http://localhost",
      writable: true,
    });

    test("wont submit with wrong values", async () => {
      addError("email", InvalidInputErrorMessges.InvalidEmail);
      render(<LoginPage />, { wrapper: BrowserRouter });
      const emailInput = screen.getByLabelText("Email address");
      userEvent.type(emailInput, "invalidemail");
      console.log(window.location.href);
      console.log(window.location.href);
      emailInput.blur();
      const buttonElement = screen.getByText("Sign In");
      fireEvent.submit(buttonElement);
    });

    test.skip("redirects to HomePage", async () => {
      render(<LoginPage />, { wrapper: BrowserRouter });
      const buttonElement = screen.getByText("Sign In");
      fireEvent.submit(buttonElement);
      expect(window.location.pathname).toBe("/");
    });
  });

  test.skip("register link redirects to RegisterPage", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });
    const link = screen.getByText("Register");
    await userEvent.click(link);
    expect(window.location.pathname).toBe("/register");
  });
});
