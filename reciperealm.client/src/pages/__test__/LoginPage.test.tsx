import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as useFormHook from "react-hook-form";
import "@testing-library/jest-dom";
import LoginPage from "../identity/LoginPage";

jest.mock("../../customHooks/identity", () => ({
  useLoginUser: jest.fn(() => {
    return { loginHandler: jest.fn() };
  }),
}));
jest.mock("react-hook-form", () => ({
  __esModule: true,
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: {
      errors: {
        email: { message: "" },
        password: { message: "" },
      },
    },
  })),
}));

describe("LoginPage Component", () => {
  describe("renders", () => {
    test("input fields", async () => {
      render(<LoginPage />);
      const emailInput = screen.getByLabelText("Email address");
      const passwordInput = screen.getByLabelText("Password");
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    test("Sign In button", () => {
      render(<LoginPage />);
      const submitButton = screen.getByText("Sign In");
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  describe("display error message for", () => {
    test("invalid email", async () => {
      const user = userEvent.setup({});
      render(<LoginPage />);
      console.log(useFormHook.useForm().formState.errors);
      useFormHook.useForm().formState.errors.email!.message = "Provide valid email";
      console.log(useFormHook.useForm().formState.errors);


      const emailInput = screen.getByLabelText("Email address");
      user.type(emailInput, "invalidemail");
      emailInput.blur();
      const errorMeassageElement = await screen.findByText(
        "Provide valid email"
      );

      expect(errorMeassageElement).toBeInTheDocument();
    });

    // test("required email", async () => {
    //   const user = userEvent.setup({});
    //   render(<LoginPage />);

    //   const emailInput = screen.getByLabelText("Email address");
    //   user.type(emailInput, "");
    //   emailInput.blur();
    //   const errorMeassageElement = await screen.findByText("This is required");

    //   expect(errorMeassageElement).toBeInTheDocument();
    // });

    // test("required password", async () => {
    //   const user = userEvent.setup({});
    //   render(<LoginPage />);

    //   const passwordInput = screen.getByLabelText("Email address");
    //   user.type(passwordInput, "");
    //   passwordInput.blur();
    //   const errorMeassageElement = await screen.findByText("This is required");

    //   expect(errorMeassageElement).toBeInTheDocument();
    // });
  });
});
